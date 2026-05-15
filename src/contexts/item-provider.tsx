"use client";

import { SelectableItem } from "@/hooks/useListSelection";
import React, { createContext, use } from "react";

const ItemContext = createContext<Promise<SelectableItem> | null>(null);

const ItemProvider = <T extends SelectableItem>({
	children,
	item,
}: {
	children: React.ReactNode;
	item: Promise<T>;
}) => {
	return (
		<ItemContext value={item as Promise<SelectableItem>}>
			{children}
		</ItemContext>
	);
};

export default ItemProvider;

export const useItem = <T extends SelectableItem>() => {
	const promise = use(ItemContext);
	if (!promise) {
		throw new Error("useItem must be withing ItemProvider");
	}
	return use(promise) as T;
};
