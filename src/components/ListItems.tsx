import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/UpdateButton";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/components/ui/item";
import {
	deleteListItem,
	updateListItem,
} from "@/lib/actions/list-item-actions";
import { ListItem } from "@prisma/client";

interface ListItemsProps {
	listItems: ListItem[];
}

const ListItems = ({ listItems }: ListItemsProps) => {
	return (
		<ul className="flex flex-col gap-3">
			{listItems.map((listItem) => {
				const updateListItemWithId = updateListItem.bind(null, listItem.id);
				const deleteListItemWithId = deleteListItem.bind(null, listItem.id);
				return (
					<li key={listItem.id}>
						<Item variant="outline" key={listItem.id}>
							<ItemContent>
								<ItemTitle>{listItem.title}</ItemTitle>
							</ItemContent>
							<ItemActions>
								<UpdateButton />
								<DeleteButton />
							</ItemActions>
						</Item>
					</li>
				);
			})}
		</ul>
	);
};

export default ListItems;
