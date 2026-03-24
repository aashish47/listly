"use client";

import { List } from "@prisma/client";
import React, { createContext, use } from "react";

const ItemContext = createContext<Promise<List> | Promise<{ title: string }>>(
	new Promise((resolve) => resolve({ title: "" })),
);

const ItemProvider = ({
	children,
	item,
}: {
	children: React.ReactNode;
	item: Promise<List>;
}) => {
	return <ItemContext value={item}>{children}</ItemContext>;
};

export default ItemProvider;

export const useItem = () => {
	const promise = use(ItemContext);
	if (!promise) {
		throw new Error("useItem must be withing ItemProvider");
	}
	return use(promise);
};
