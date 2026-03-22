import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useRef, useState } from "react";

export interface SelectableItem {
	id: string;
	title: string;
}

export function useListSelection<T extends SelectableItem>(
	items: T[],
	searchKey = "search",
	startsWithKey = "startswith",
) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 1. Local State for Selection
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	// 2. Sync from URL (Now async-safe in Next 16)
	const searchQuery = searchParams.get(searchKey) || "";
	const startsWithQuery = searchParams.get(startsWithKey) || "";

	// 3. Debounced Search (Ref required for the timer lifecycle)
	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const setSearchQuery = (query: string) => {
		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		searchTimeoutRef.current = setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			query
				? params.set(searchKey, query.toLowerCase())
				: params.delete(searchKey);
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		}, 300);
	};

	const setStartsWithQuery = (query: string) => {
		const params = new URLSearchParams(window.location.search);
		query
			? params.set(startsWithKey, query.toLowerCase())
			: params.delete(startsWithKey);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	// 4. Filtering (Compiler handles the memoization automatically)
	const deferredSearch = useDeferredValue(searchQuery);
	const filteredItems = items.filter((item) => {
		const title = item.title.toLowerCase();
		const matchesSearch = title.includes(deferredSearch.toLowerCase());
		const matchesAlpha = startsWithQuery
			? title.startsWith(startsWithQuery.toLowerCase())
			: true;
		return matchesSearch && matchesAlpha;
	});

	// 5. Derived State
	const validSelectedIds = new Set(
		[...selectedIds].filter((id) => items.some((i) => i.id === id)),
	);
	const totalFiltered = filteredItems.length;
	const selectedInFilter = filteredItems.filter((item) =>
		validSelectedIds.has(item.id),
	).length;
	const isAllSelected = totalFiltered > 0 && selectedInFilter === totalFiltered;

	// 6. Selection Handlers
	const toggleSelect = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const toggleSelectAll = () => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (isAllSelected) {
				filteredItems.forEach((item) => next.delete(item.id));
			} else {
				filteredItems.forEach((item) => next.add(item.id));
			}
			return next;
		});
	};

	// Cleanup Effect (Still necessary for side-effects)
	useEffect(() => {
		return () => {
			if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		};
	}, []);

	return {
		filteredItems,
		searchQuery,
		setSearchQuery,
		startsWithQuery,
		setStartsWithQuery,
		selectedIds: validSelectedIds,
		selectedCount: validSelectedIds.size,
		selectedInFilter,
		totalFiltered,
		isAllSelected,
		isPartialSelected: selectedInFilter > 0 && !isAllSelected,
		toggleSelect,
		toggleSelectAll,
		resetSelection: () => setSelectedIds(new Set()),
	};
}

export type UseListSelectionReturn<T extends SelectableItem> = ReturnType<
	typeof useListSelection<T>
>;
