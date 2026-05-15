import AddButton from "@/components/buttons/AddButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/UpdateButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/components/ui/item";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/hooks/useListSelection";
import { deleteList, updateList } from "@/lib/actions/list-actions";
import {
	addListItem,
	deleteListItem,
	updateListItem,
} from "@/lib/actions/list-item-actions";
import { slugify } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface ListItemProps<T extends SelectableItem> {
	listType: "outer" | "inner";
	item: T;
	listSelection: Pick<
		UseListSelectionReturn<T>,
		"resetSelection" | "selectedIds" | "toggleSelect"
	>;
}

const ListItem = <T extends SelectableItem>({
	listType,
	item,
	listSelection,
}: ListItemProps<T>) => {
	const { id, title } = item;
	const { resetSelection, selectedIds, toggleSelect } = listSelection;
	const isSelected = selectedIds.has(id);

	const modes = {
		outer: {
			addAction: addListItem,
			deleteAction: deleteList,
			updateAction: updateList,
		},
		inner: {
			addAction: null,
			deleteAction: deleteListItem,
			updateAction: updateListItem,
		},
	};

	const mode = modes[listType];
	const { addAction, deleteAction, updateAction } = mode;

	const addListItemsWithId = addAction?.bind(null, id);
	const updateListWithId = updateAction.bind(null, id);
	const deleteListWithId = deleteAction.bind(null, id);

	return (
		<div className="pb-2">
			<Item
				className="transform-gpu backface-hidden"
				variant={isSelected ? "muted" : "outline"}
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
					{addListItemsWithId && (
						<>
							<Button asChild variant="outline" size="icon">
								<Link href={`/${slugify(title)}/${id}`}>
									<ArrowRightIcon />
								</Link>
							</Button>

							<AddButton
								title={title}
								formType="add"
								addAction={addListItemsWithId}
							/>
						</>
					)}
					<UpdateButton title={title} updateAction={updateListWithId} />
					<DeleteButton
						title={title}
						deleteAction={deleteListWithId}
						listSelection={{ resetSelection }}
					/>
				</ItemActions>
			</Item>
		</div>
	);
};

export default ListItem;
