import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";

export const fetchLists = async () => {
	const user = await getSessionUser();

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
