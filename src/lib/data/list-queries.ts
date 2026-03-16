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
		console.error("Database Error:", err);
		throw new Error("Failed to load your lists. Please try again later.");
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
		console.error("Database Error:", err);
		throw new Error("Failed to load your lists. Please try again later.");
	}
};
