import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface SelectableItem {
	id: string;
	title: string;
}
export const enum ListUrlParams {
	SEARCH = "search",
	STARTSWITH = "startswith",
}

export function useListSelection<T extends SelectableItem>(
	items: T[],
	searchKey: ListUrlParams = ListUrlParams.SEARCH,
	startsWithKey: ListUrlParams = ListUrlParams.STARTSWITH,
) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// 1. Initial state from URL
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get(searchKey) || "",
	);
	const [startsWithQuery, setStartsWithQuery] = useState(
		searchParams.get(startsWithKey) || "",
	);

	// 2. URL Sync (Debounced)
	// This keeps the URL updated in the background without slowing down the typing

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const params = new URLSearchParams(searchParams);

			const currentSearchQuery = params.get(searchKey) || "";
			const currentStartsWithQuery = params.get(startsWithQuery) || "";

			if (
				currentSearchQuery === searchQuery &&
				currentStartsWithQuery === startsWithKey
			)
				return;

			// Sync Search
			if (searchQuery) params.set(searchKey, searchQuery);
			else params.delete(searchKey);

			// Sync StartsWith
			if (startsWithQuery) params.set(startsWithKey, startsWithQuery);
			else params.delete(startsWithKey);

			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, startsWithQuery, pathname, router]);

	// 3. Memoized Filtering
	const filteredItems = useMemo(() => {
		const q = searchQuery.toLowerCase();
		const a = startsWithQuery.toLowerCase();

		return items.filter((item) => {
			const title = item.title.toLowerCase();
			const matchesSearch = title.includes(q);
			const matchesAlpha = a ? title.startsWith(a) : true;

			return matchesSearch && matchesAlpha;
		});
	}, [items, searchQuery, startsWithQuery]);

	// 4. Selection Derived State (The "Ghost Buster")
	const validSelectedIds = useMemo(() => {
		const valid = new Set<string>();
		// Only keep IDs that actually exist in the current items list
		items.forEach((item) => {
			if (selectedIds.has(item.id)) {
				valid.add(item.id);
			}
		});
		return valid;
	}, [items, selectedIds]);

	// 5. Selection Derived State (scoped to filter)
	const totalFiltered = filteredItems.length;
	const selectedInFilter = filteredItems.filter((item) =>
		validSelectedIds.has(item.id),
	).length;

	const isAllSelected = totalFiltered > 0 && selectedInFilter === totalFiltered;
	const isPartialSelected = selectedInFilter > 0 && !isAllSelected;

	// 6. Selection Handlers
	const toggleSelect = useCallback((id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}, []);

	const toggleSelectAll = useCallback(() => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (isAllSelected) {
				// Remove only the currently visible items
				filteredItems.forEach((item) => next.delete(item.id));
			} else {
				// Add all currently visible items
				filteredItems.forEach((item) => next.add(item.id));
			}
			return next;
		});
	}, [isAllSelected, filteredItems]);

	const resetSelection = useCallback(() => {
		setSelectedIds(new Set());
	}, []);

	return {
		// Data
		filteredItems,
		searchQuery,
		setSearchQuery,
		startsWithQuery,
		setStartsWithQuery,
		selectedIds: validSelectedIds,
		// Stats
		selectedCount: validSelectedIds.size, // Total selected in app
		selectedInFilter, // Selected in current view
		totalFiltered,
		// Flags
		isAllSelected,
		isPartialSelected,
		// Methods
		toggleSelect,
		toggleSelectAll,
		resetSelection,
	};
}

export type UseListSelectionReturn<T extends SelectableItem> = ReturnType<
	typeof useListSelection<T>
>;
