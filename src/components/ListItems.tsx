import { AnimatedList, AnimatedListItem } from "@/components/AnimatedList";
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
		<AnimatedList>
			{listItems.map(({ id, title }) => {
				const updateListItemWithId = updateListItem.bind(null, id, title);
				const deleteListItemWithId = deleteListItem.bind(null, id, title);
				return (
					<AnimatedListItem key={id}>
						<Item variant="outline">
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
					</AnimatedListItem>
				);
			})}
		</AnimatedList>
	);
};

export default ListItems;
