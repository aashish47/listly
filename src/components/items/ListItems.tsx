"use client";

import { useListSelection } from "@/components/hooks/useListSelection";
import InnerListItem from "@/components/items/InnerListItem";
import Toolbar from "@/components/Toolbar";
import { deleteManyListItems } from "@/lib/actions/list-item-actions";
import { ListItem } from "@prisma/client";
import { Virtuoso } from "react-virtuoso";

interface ListItemsProps {
	listItems: ListItem[];
}

const ListItems = ({ listItems }: ListItemsProps) => {
	const listSelection = useListSelection(listItems);
	const {
		filteredItems,
		resetSelection,
		selectedIds,
		toggleSelect,
		totalFiltered,
	} = listSelection;

	return (
		<div className="flex h-full grow flex-col gap-2">
			<Toolbar
				deleteAction={deleteManyListItems}
				listSelection={listSelection}
			/>

			<div className="grow">
				<Virtuoso
					className="no-scrollbar"
					fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
					overscan={500}
					totalCount={totalFiltered}
					data={filteredItems}
					itemContent={(_index, item) => (
						<InnerListItem
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
		</div>
	);
};

export default ListItems;
