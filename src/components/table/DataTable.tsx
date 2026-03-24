"use client";

import { useItems } from "@/components/contexts/items-provider";
import {
	SelectableItem,
	useListSelection,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import Toolbar from "@/components/table/Toolbar";
import { ActionPromise } from "@/types/actions";
import { Virtuoso } from "react-virtuoso";

interface DataTableProps<T extends SelectableItem> {
	deleteAction: (ids: string[]) => ActionPromise;
	ItemComponent: React.ComponentType<{
		item: T;
		listSelection: Pick<
			UseListSelectionReturn<T>,
			"resetSelection" | "selectedIds" | "toggleSelect"
		>;
	}>;
}

const DataTable = <T extends SelectableItem>({
	deleteAction,
	ItemComponent,
}: DataTableProps<T>) => {
	const items = useItems<T>();

	const listSelection = useListSelection(items);
	const { isPending, resetSelection, selectedIds, toggleSelect, totalItems } =
		listSelection;

	return (
		<div className="flex h-full grow flex-col gap-2">
			<Toolbar deleteAction={deleteAction} listSelection={listSelection} />
			{!isPending ? (
				<div className="grow">
					<Virtuoso
						className="no-scrollbar"
						data={items}
						fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
						overscan={500}
						totalCount={totalItems}
						itemContent={(index, item) => (
							<ItemComponent
								item={item}
								listSelection={{
									resetSelection,
									selectedIds,
									toggleSelect,
								}}
							/>
						)}
					/>
				</div>
			) : (
				<ItemSkeleton />
			)}
		</div>
	);
};

export default DataTable;
