"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const fetchListItems = async (listId: string, userId: string) => {
	cacheLife("max");
	cacheTag(`list-${listId}`);

	try {
		return await prisma.listItem.findMany({
			where: {
				listId,
				list: {
					userId,
				},
			},
			orderBy: { title: "asc" },
		});
	} catch (err) {
		console.error("FETCH_LIST_ITEM_ERROR:", err);
		notFound();
	}
};

export const fetchListItemsByAlpha = async (
	listId: string,
	alpha: string,
	userId: string,
) => {
	cacheLife("max");
	cacheTag(`list-${listId}-${alpha}`);

	try {
		return await prisma.listItem.findMany({
			orderBy: { title: "asc" },
			where: {
				listId,
				title: { startsWith: alpha.toLowerCase() },
				list: { userId },
			},
		});
	} catch (err) {
		console.log("FETCH_LIST_ITEM_ALPHA_ERROR:", err);
		notFound();
	}
};
