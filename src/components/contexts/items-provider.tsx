"use client";

import { SelectableItem } from "@/components/hooks/useListSelection";
import React, { createContext, use } from "react";

export const ItemsContext = createContext<Promise<any[]> | null>(null);

const ItemsProvider = <T extends SelectableItem>({
	children,
	items,
}: {
	children: React.ReactNode;
	items: Promise<T[]>;
}) => {
	return (
		<ItemsContext value={items as Promise<any[]>}>{children}</ItemsContext>
	);
};

export default ItemsProvider;

export const useItems = <T extends SelectableItem>() => {
	const promise = use(ItemsContext);
	if (!promise) {
		throw new Error("useItems must be used within an ItemsProvider");
	}
	return use(promise) as T[];
};
