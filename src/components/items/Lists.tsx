"use client";

import { useListSelection } from "@/components/hooks/useListSelection";
import OuterListItem from "@/components/items/OuterListItem";
import Toolbar from "@/components/Toolbar";
import { deleteManyLists } from "@/lib/actions/list-actions";
import { List } from "@prisma/client";
import { Virtuoso } from "react-virtuoso";

interface ListsProps {
	lists: List[];
}

const Lists = ({ lists }: ListsProps) => {
	const listSelection = useListSelection(lists);
	const {
		filteredItems,
		resetSelection,
		selectedIds,
		toggleSelect,
		totalFiltered,
	} = listSelection;

	return (
		<div className="flex h-full grow flex-col gap-2">
			<Toolbar deleteAction={deleteManyLists} listSelection={listSelection} />

			<div className="grow">
				<Virtuoso
					className="no-scrollbar"
					data={filteredItems}
					totalCount={totalFiltered}
					fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
					overscan={500}
					itemContent={(index, list) => (
						<OuterListItem
							list={list}
							listSelection={{
								resetSelection,
								selectedIds,
								toggleSelect,
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default Lists;
