import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface SelectableItem {
	id: string;
	title: string;
}
export const enum ListUrlParams {
	SEARCH = "search",
}

export function useListSelection<T extends SelectableItem>(
	items: T[],
	seachKey: ListUrlParams = ListUrlParams.SEARCH,
) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// 1. Initial state from URL
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get(seachKey) || "",
	);

	// 2. URL Sync (Debounced)
	// This keeps the URL updated in the background without slowing down the typing

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const params = new URLSearchParams(searchParams);
			const currentQuery = params.get(seachKey) || "";
			if (currentQuery === searchQuery) return;
			if (searchQuery) {
				params.set(seachKey, searchQuery);
			} else {
				params.delete(seachKey);
			}

			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, pathname, router]);

	// 3. Memoized Filtering
	const filteredItems = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return items.filter((item) => item.title.toLowerCase().includes(query));
	}, [items, searchQuery]);

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
