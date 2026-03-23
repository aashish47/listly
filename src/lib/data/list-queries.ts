"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const fetchLists = cache(
	async (
		userId: string,
		filters?: {
			q?: string;
			prefix?: string;
		},
	) => {
		cacheLife("max");
		cacheTag("lists");

		return await prisma.list.findMany({
			where: {
				userId,
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

export const fetchListById = cache(async (userId: string, id: string) => {
	cacheLife("max");
	cacheTag("lists");

	const list = await prisma.list.findFirst({
		where: { userId, id },
	});

	if (!list) {
		notFound();
	}

	return list;
});

export const fetchListsInitials = cache(async (userId: string) => {
	cacheLife("max");
	cacheTag("lists");
	const items = await prisma.list.findMany({
		where: {
			userId,
		},
		select: { title: true },
	});

	return Array.from(new Set(items.map((item) => item.title[0].toUpperCase())));
});
