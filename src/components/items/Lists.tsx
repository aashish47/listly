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
import { deleteList, updateList } from "@/lib/actions/list-actions";
import { List } from "@prisma/client";
import Link from "next/link";
import { Virtuoso } from "react-virtuoso";

interface ListsProps {
	lists: List[];
}

const Lists = ({ lists }: ListsProps) => {
	return (
		<div className="grow">
			<Virtuoso
				className="no-scrollbar"
				data={lists}
				totalCount={lists.length}
				fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
				overscan={500}
				itemContent={(index, list) => {
					const { id, title } = list;
					const updateListWithId = updateList.bind(null, id);
					const deleteListWithId = deleteList.bind(null, id);

					return (
						<div className="pb-2">
							<Item
								variant="outline"
								className="group relative transform-gpu backface-hidden"
								style={{ height: `${ITEM_HEIGHT}px` }}
							>
								<Link href={`/${title}/${id}`} className="block w-full py-1.5">
									<ItemContent>
										<ItemTitle>{title}</ItemTitle>
									</ItemContent>
								</Link>

								<div className="absolute right-2.5">
									<ItemActions>
										<UpdateButton
											title={title}
											updateAction={updateListWithId}
										/>
										<DeleteButton
											title={title}
											deleteAction={deleteListWithId}
										/>
									</ItemActions>
								</div>
							</Item>
						</div>
					);
				}}
			/>
		</div>
	);
};

export default Lists;
