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
