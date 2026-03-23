"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";

export const fetchListItems = cache(
	async (
		listId: string,
		userId: string,
		filters?: {
			q?: string;
			prefix?: string;
		},
	) => {
		cacheLife("max");
		cacheTag(`list-${listId}`);

		return await prisma.listItem.findMany({
			where: {
				listId,
				list: {
					userId,
				},
				title: {
					contains: filters?.q,
					startsWith: filters?.prefix,
					mode: "insensitive",
				},
			},
			orderBy: { title: "asc" },
		});
	},
);

export const fetchListItemsInitials = cache(
	async (listId: string, userId: string) => {
		cacheLife("max");
		cacheTag(`list-${listId}`);
		const items = await prisma.listItem.findMany({
			where: {
				listId,
				list: { userId },
			},
			select: { title: true },
		});

		return Array.from(
			new Set(items.map((item) => item.title[0].toUpperCase())),
		);
	},
);
