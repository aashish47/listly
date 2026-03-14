import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/UpdateButton";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/components/ui/item";
import { deleteList, updateList } from "@/lib/actions/list-actions";
import { List } from "@prisma/client";
import Link from "next/link";

interface ListsProps {
	lists: List[];
}

const Lists = ({ lists }: ListsProps) => {
	return (
		<ul className="flex flex-col gap-3">
			{lists.map((list) => {
				const updateListWithId = updateList.bind(null, list.id);
				const deleteListWithId = deleteList.bind(null, list.id);
				return (
					<li key={list.id}>
						<Item variant="outline" className="group relative">
							<Link href={`/${list.id}`} className="block w-full py-1.5">
								<ItemContent>
									<ItemTitle>{list.title}</ItemTitle>
								</ItemContent>
							</Link>

							<div className="absolute right-2.5">
								<ItemActions>
									<UpdateButton />
									<DeleteButton />
								</ItemActions>
							</div>
						</Item>
					</li>
				);
			})}
		</ul>
	);
};

export default Lists;
