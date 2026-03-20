"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const fetchListItems = cache(async (listId: string, userId: string) => {
	cacheLife("max");
	cacheTag(`list-${listId}`);

	const listItems = await prisma.listItem.findMany({
		where: {
			listId,
			list: {
				userId,
			},
		},
		orderBy: { title: "asc" },
	});

	if (!listItems) {
		notFound();
	}

	return listItems;
});

export const fetchListItemsByAlpha = cache(
	async (listId: string, alpha: string, userId: string) => {
		cacheLife("max");
		cacheTag(`list-${listId}-${alpha}`);

		const listItems = await prisma.listItem.findMany({
			where: {
				listId,
				title: { startsWith: alpha, mode: "insensitive" },
				list: { userId },
			},
			orderBy: { title: "asc" },
		});

		if (!listItems) {
			notFound();
		}
		return listItems;
	},
);
