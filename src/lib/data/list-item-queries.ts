import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";

export const fetchListItems = async (listId: string) => {
	const user = await getSessionUser();

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

export const fetchListItemsByAlpha = async (alpha: string, listId: string) => {
	const user = getSessionUser();
	try {
		return await prisma.listItem.findMany({
			orderBy: { title: "asc" },
			where: { listId, title: { startsWith: alpha.toLowerCase() } },
		});
	} catch (err) {
		throw new Error(`Error fetching vocabulary ${err}`);
	}
};
