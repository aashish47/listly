"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";

export const fetchListItems = cache(async (listId: string, userId: string) => {
	cacheLife("max");
	cacheTag(`list-${listId}`);

	return await prisma.listItem.findMany({
		where: {
			listId,
			list: {
				userId,
			},
		},
		orderBy: { title: "asc" },
	});
});

export const fetchListItemsByAlpha = cache(
	async (listId: string, alpha: string, userId: string) => {
		cacheLife("max");
		cacheTag(`list-${listId}-${alpha}`);

		return await prisma.listItem.findMany({
			where: {
				listId,
				title: { startsWith: alpha, mode: "insensitive" },
				list: { userId },
			},
			orderBy: { title: "asc" },
		});
	},
);
