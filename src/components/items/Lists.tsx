"use client";

import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/UpdateButton";
import {
	AnimatedList,
	AnimatedListItem,
} from "@/components/items/AnimatedList";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/components/ui/item";
import { ITEM_HEIGHT } from "@/constants/dimensions";
import { deleteList, updateList } from "@/lib/actions/list-actions";
import { List } from "@prisma/client";
import Link from "next/link";

interface ListsProps {
	lists: List[];
}

const Lists = ({ lists }: ListsProps) => {
	return (
		<AnimatedList>
			{lists.map(({ id, title }) => {
				const updateListWithId = updateList.bind(null, id);
				const deleteListWithId = deleteList.bind(null, id);
				return (
					<AnimatedListItem key={id}>
						<Item
							variant="outline"
							className={`group relative h-${ITEM_HEIGHT}`}
						>
							<Link href={`/${id}`} className="block w-full py-1.5">
								<ItemContent>
									<ItemTitle>{title}</ItemTitle>
								</ItemContent>
							</Link>

							<div className="absolute right-2.5">
								<ItemActions>
									<UpdateButton title={title} updateAction={updateListWithId} />
									<DeleteButton title={title} deleteAction={deleteListWithId} />
								</ItemActions>
							</div>
						</Item>
					</AnimatedListItem>
				);
			})}
		</AnimatedList>
	);
};

export default Lists;
