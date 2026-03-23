import { SEARCH_PARAMS } from "@/constants/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export interface SelectableItem {
	id: string;
	title: string;
}

export function useListSelection<T extends SelectableItem>(
	items: T[],
	q = SEARCH_PARAMS.QUERY,
	prefix = SEARCH_PARAMS.PREFIX,
) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 1. Local State for Selection
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	// 2. Sync from URL
	const searchQuery = searchParams.get(q) || "";
	const startsWithQuery = searchParams.get(prefix) || "";

	// 3. Debounced Search (Ref required for the timer lifecycle)
	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const setSearchQuery = (query: string) => {
		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		searchTimeoutRef.current = setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			query ? params.set(q, query.toLowerCase()) : params.delete(q);
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		}, 300);
	};

	const setStartsWithQuery = (query: string) => {
		const params = new URLSearchParams(window.location.search);
		query ? params.set(prefix, query.toLowerCase()) : params.delete(prefix);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	// 4. Derived State
	const validSelectedIds = new Set(
		[...selectedIds].filter((id) => items.some((i) => i.id === id)),
	);
	const totalFiltered = items.length;
	const selectedInFilter = items.filter((item) =>
		validSelectedIds.has(item.id),
	).length;
	const isAllSelected = totalFiltered > 0 && selectedInFilter === totalFiltered;

	// 5. Selection Handlers
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
				items.forEach((item) => next.delete(item.id));
			} else {
				items.forEach((item) => next.add(item.id));
			}
			return next;
		});
	};

	// Cleanup Effect
	useEffect(() => {
		return () => {
			if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		};
	}, []);

	return {
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
