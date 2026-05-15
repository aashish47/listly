"use client";

import ListItem from "@/components/items/ListItem";
import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import Toolbar from "@/components/table/Toolbar";
import { useItems } from "@/contexts/items-provider";
import { SelectableItem, useListSelection } from "@/hooks/useListSelection";
import { useParams } from "next/navigation";
import { Virtuoso } from "react-virtuoso";

const DataTable = <T extends SelectableItem>() => {
	const items = useItems<T>();
	const { listId } = useParams();

	const listSelection = useListSelection(items);
	const { isPending, resetSelection, selectedIds, toggleSelect, totalItems } =
		listSelection;

	return (
		<div className="flex h-full grow flex-col gap-2">
			<Toolbar listSelection={listSelection} />
			{!isPending ? (
				<div className="grow">
					<Virtuoso
						className="no-scrollbar"
						data={items}
						// fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
						overscan={500}
						totalCount={totalItems}
						itemContent={(index, item) => (
							<ListItem
								listType={listId ? "inner" : "outer"}
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
