import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/UpdateButton";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import { Checkbox } from "@/components/ui/checkbox";
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

interface InnerListItemProps<T extends SelectableItem> {
	item: ListItem;
	listSelection: Pick<
		UseListSelectionReturn<T>,
		"resetSelection" | "selectedIds" | "toggleSelect"
	>;
}

const InnerListItem = <T extends SelectableItem>({
	item,
	listSelection,
}: InnerListItemProps<T>) => {
	const { id, title } = item;
	const { resetSelection, selectedIds, toggleSelect } = listSelection;
	const isSelected = selectedIds.has(id);

	const updateListItemWithId = updateListItem.bind(null, id, title);
	const deleteListItemWithId = deleteListItem.bind(null, id);

	return (
		<div className="pb-2">
			<Item
				className="transform-gpu backface-hidden"
				variant={isSelected ? "muted" : "outline"}
				style={{ height: `${ITEM_HEIGHT}px` }}
			>
				<div className="flex items-center pr-4">
					<Checkbox
						checked={isSelected}
						onCheckedChange={() => toggleSelect(id)}
					/>
				</div>

				<ItemContent>
					<ItemTitle className="break-all">{title}</ItemTitle>
				</ItemContent>

				<ItemActions>
					<UpdateButton title={title} updateAction={updateListItemWithId} />
					<DeleteButton
						title={title}
						deleteAction={deleteListItemWithId}
						listSelection={{ resetSelection }}
					/>
				</ItemActions>
			</Item>
		</div>
	);
};

export default InnerListItem;
