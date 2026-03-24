import { SEARCH_PARAMS } from "@/constants/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

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

	const [isPending, startTransition] = useTransition();
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
			startTransition(() =>
				router.replace(`${pathname}?${params.toString()}`, { scroll: false }),
			);
		}, 300);
	};

	const setStartsWithQuery = (query: string) => {
		const params = new URLSearchParams(window.location.search);
		query ? params.set(prefix, query.toLowerCase()) : params.delete(prefix);
		startTransition(() =>
			router.replace(`${pathname}?${params.toString()}`, { scroll: false }),
		);
	};

	// 4. Derived State
	const totalItems = items.length;

	// 4.1. Get the IDs currently visible in the items list
	const itemIdsInView = new Set(items.map((i) => i.id));

	// 4.2. Filter selectedIds by what is actually in view
	const validSelectedIds = new Set(
		[...selectedIds].filter((id) => itemIdsInView.has(id)),
	);
	const selectedCount = validSelectedIds.size;

	// 4.3. Logic check
	const isAllSelected = totalItems > 0 && totalItems === selectedCount;

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
		isPending,
		searchQuery,
		setSearchQuery,
		startsWithQuery,
		setStartsWithQuery,
		selectedIds: validSelectedIds,
		selectedCount,
		totalItems,
		isAllSelected,
		isPartialSelected: selectedCount > 0 && !isAllSelected,
		toggleSelect,
		toggleSelectAll,
		resetSelection: () => setSelectedIds(new Set()),
	};
}

export type UseListSelectionReturn<T extends SelectableItem> = ReturnType<
	typeof useListSelection<T>
>;
