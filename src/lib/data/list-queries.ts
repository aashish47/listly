"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const fetchLists = cache(async (userId: string) => {
	cacheLife("max");
	cacheTag("lists");

	const lists = await prisma.list.findMany({
		where: { userId },
		orderBy: { title: "asc" },
	});

	if (!lists) {
		notFound();
	}

	return lists;
});

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
