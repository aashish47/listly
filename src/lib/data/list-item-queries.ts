"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export const fetchListItems = async (listId: string) => {
	cacheLife("max");
	cacheTag(`list-${listId}`);

	try {
		return await prisma.listItem.findMany({
			where: { listId },
			orderBy: { title: "asc" },
		});
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to load your lists. Please try again later.");
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
		throw new Error(`Error fetching vocabulary ${err}`);
	}
};
