"use client";

import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/UpdateButton";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/components/ui/item";
import { ITEM_HEIGHT } from "@/constants/dimensions";
import {
	deleteListItem,
	updateListItem,
} from "@/lib/actions/list-item-actions";
import { ListItem } from "@prisma/client";
import { Virtuoso } from "react-virtuoso";

interface ListItemsProps {
	listItems: ListItem[];
}

const ListItems = ({ listItems }: ListItemsProps) => {
	return (
		<div className="grow">
			<Virtuoso
				className="no-scrollbar"
				fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
				overscan={500}
				totalCount={listItems.length}
				data={listItems}
				itemContent={(index, item) => {
					const { id, title } = item;
					const updateListItemWithId = updateListItem.bind(null, id, title);
					const deleteListItemWithId = deleteListItem.bind(null, id, title);

					return (
						<div className="pb-2">
							<Item
								className="transform-gpu backface-hidden"
								variant="outline"
								style={{ height: `${ITEM_HEIGHT}px` }}
							>
								<ItemContent>
									<ItemTitle className="break-all">{title}</ItemTitle>
								</ItemContent>
								<ItemActions>
									<UpdateButton
										title={title}
										updateAction={updateListItemWithId}
									/>
									<DeleteButton
										title={title}
										deleteAction={deleteListItemWithId}
									/>
								</ItemActions>
							</Item>
						</div>
					);
				}}
			/>
		</div>
	);
};

export default ListItems;
