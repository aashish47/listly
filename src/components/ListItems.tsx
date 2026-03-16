"use client";

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
import { AnimatePresence, motion, Variants } from "framer-motion";

interface ListItemsProps {
	listItems: ListItem[];
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

const ListItems = ({ listItems }: ListItemsProps) => {
	return (
		<motion.ul
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="flex flex-col gap-3"
		>
			<AnimatePresence mode="popLayout">
				{listItems.map(({ id, title }) => {
					const updateListItemWithId = updateListItem.bind(null, id, title);
					const deleteListItemWithId = deleteListItem.bind(null, id, title);
					return (
						<motion.li
							key={id}
							variants={itemVariants}
							exit="removed"
							layout
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 24,
							}}
						>
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
						</motion.li>
					);
				})}
			</AnimatePresence>
		</motion.ul>
	);
};

export default ListItems;
