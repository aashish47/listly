"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";

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

export const AnimatedList = ({ children }: React.PropsWithChildren) => {
	return (
		<motion.ul
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="flex flex-col gap-3"
		>
			<AnimatePresence mode="popLayout">{children}</AnimatePresence>
		</motion.ul>
	);
};

export const AnimatedListItem = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<motion.li
			variants={itemVariants}
			exit="removed"
			layout
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 24,
			}}
		>
			{children}
		</motion.li>
	);
};
