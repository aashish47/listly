"use cache";
import { prisma } from "@/lib/prisma";
import { User } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";

export const fetchLists = async (user: User) => {
	cacheLife("max");
	cacheTag("lists");

	try {
		return await prisma.list.findMany({
			where: { userId: user.id },
			orderBy: { title: "asc" },
		});
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to load your lists. Please try again later.");
	}
};
