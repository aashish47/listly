"use client";

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
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";

interface ListsProps {
	lists: List[];
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 24,
		},
	},
	removed: {
		opacity: 0,
		scale: 0.5,
		transition: { duration: 0.15 },
	},
} as const;

const Lists = ({ lists }: ListsProps) => {
	return (
		<motion.ul
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="flex flex-col gap-3"
		>
			<AnimatePresence mode="popLayout">
				{lists.map((list) => {
					const updateListWithId = updateList.bind(null, list.id);
					const deleteListWithId = deleteList.bind(null, list.id);
					return (
						<motion.li
							key={list.id}
							variants={itemVariants}
							exit="removed"
							layout
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 24,
							}}
						>
							<Item variant="outline" className="group relative">
								<Link href={`/${list.id}`} className="block w-full py-1.5">
									<ItemContent>
										<ItemTitle>{list.title}</ItemTitle>
									</ItemContent>
								</Link>

								<div className="absolute right-2.5">
									<ItemActions>
										<UpdateButton
											title={list.title}
											updateAction={updateListWithId}
										/>
										<DeleteButton
											title={list.title}
											deleteAction={deleteListWithId}
										/>
									</ItemActions>
								</div>
							</Item>
						</motion.li>
					);
				})}
			</AnimatePresence>
		</motion.ul>
	);
};

export default Lists;
