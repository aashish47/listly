import { useCallback, useMemo, useState } from "react";

export interface SelectableItem {
	id: string;
	title: string;
}

export function useListSelection<T extends SelectableItem>(items: T[]) {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [searchQuery, setSearchQuery] = useState("");

	// 1. Memoized Filtering
	const filteredItems = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return items.filter((item) => item.title.toLowerCase().includes(query));
	}, [items, searchQuery]);

	// 2. Selection Derived State (scoped to filter)
	const totalFiltered = filteredItems.length;
	const selectedInFilter = filteredItems.filter((item) =>
		selectedIds.has(item.id),
	).length;

	const isAllSelected = totalFiltered > 0 && selectedInFilter === totalFiltered;
	const isPartialSelected = selectedInFilter > 0 && !isAllSelected;

	// 3. Selection Handlers
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

	// 4. Copy Helper Logic
	const getTargetItems = useCallback(() => {
		const currentSelection = filteredItems.filter((item) =>
			selectedIds.has(item.id),
		);
		return currentSelection.length === 0 ? filteredItems : currentSelection;
	}, [filteredItems, selectedIds]);

	return {
		// Data
		filteredItems,
		searchQuery,
		setSearchQuery,
		selectedIds,
		// Stats
		selectedCount: selectedIds.size, // Total selected in app
		selectedInFilter, // Selected in current view
		totalFiltered,
		// Flags
		isAllSelected,
		isPartialSelected,
		// Methods
		toggleSelect,
		toggleSelectAll,
		resetSelection,
		getTargetItems,
	};
}

export type UseListSelectionReturn<T extends SelectableItem> = ReturnType<
	typeof useListSelection<T>
>;
