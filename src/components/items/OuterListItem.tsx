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
import { deleteList, updateList } from "@/lib/actions/list-actions";
import { slugify } from "@/lib/utils";
import { List } from "@prisma/client";
import Link from "next/link";

interface OuterListItemProps<T extends SelectableItem> {
	list: List;
	listSelection: Pick<
		UseListSelectionReturn<T>,
		"resetSelection" | "selectedIds" | "toggleSelect"
	>;
}

const OuterListItem = <T extends SelectableItem>({
	list,
	listSelection,
}: OuterListItemProps<T>) => {
	const { id, title } = list;
	const { resetSelection, selectedIds, toggleSelect } = listSelection;
	const isSelected = selectedIds.has(id);
	const updateListWithId = updateList.bind(null, id);
	const deleteListWithId = deleteList.bind(null, id);

	return (
		<div className="pb-2">
			<Item
				variant="outline"
				className="group relative transform-gpu backface-hidden"
				style={{ height: `${ITEM_HEIGHT}px` }}
			>
				<div className="flex flex-1 gap-2">
					<div className="flex items-center pr-4">
						<Checkbox
							checked={isSelected}
							onCheckedChange={() => toggleSelect(id)}
						/>
					</div>
					<Link
						href={`/${slugify(title)}/${id}`}
						className="block w-full py-1.5"
					>
						<ItemContent>
							<ItemTitle>{title}</ItemTitle>
						</ItemContent>
					</Link>
				</div>

				<div className="absolute right-2.5">
					<ItemActions>
						<UpdateButton title={title} updateAction={updateListWithId} />
						<DeleteButton
							title={title}
							deleteAction={deleteListWithId}
							listSelection={{ resetSelection }}
						/>
					</ItemActions>
				</div>
			</Item>
		</div>
	);
};

export default OuterListItem;
