"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const fetchListItems = async (listId: string) => {
	cacheLife("max");
	cacheTag(`list-${listId}`);

	try {
		return await prisma.listItem.findMany({
			where: { listId },
			orderBy: { title: "asc" },
		});
	} catch (err) {
		console.error("FETCH_LIST_ITEM_ERROR:", err);
		notFound();
	}
};

export const fetchListItemsByAlpha = async (listId: string, alpha: string) => {
	cacheLife("max");
	cacheTag(`list-${listId}-${alpha}`);

	try {
		return await prisma.listItem.findMany({
			orderBy: { title: "asc" },
			where: { listId, title: { startsWith: alpha.toLowerCase() } },
		});
	} catch (err) {
		console.log("FETCH_LIST_ITEM_ALPHA_ERROR:", err);
		notFound();
	}
};
