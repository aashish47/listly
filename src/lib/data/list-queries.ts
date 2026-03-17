"use cache";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const fetchLists = async (userId: string) => {
	cacheLife("max");
	cacheTag("lists");

	try {
		return await prisma.list.findMany({
			where: { userId },
			orderBy: { title: "asc" },
		});
	} catch (err) {
		console.error("FETCH_LIST_ERROR:", err);
		notFound();
	}
};

export const fetchListById = async (userId: string, id: string) => {
	cacheLife("max");
	cacheTag("lists");

	try {
		const list = await prisma.list.findFirst({
			where: { userId, id },
		});
		if (!list) {
			notFound();
		}
		return list;
	} catch (err) {
		console.error("FETCH_LIST_ID:", err);
		notFound();
	}
};
