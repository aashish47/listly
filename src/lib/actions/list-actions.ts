"use server";

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/server-utils";
import { parseMultilineInput } from "@/lib/utils";
import { updateTag } from "next/cache";

export const addList = async (formData: FormData) => {
	return safeAction("ADD_LIST", async (user) => {
		const titles = parseMultilineInput(formData.get("titles") as string);
		if (titles.length === 0) throw new Error("No titles provided");

		await prisma.list.createMany({
			data: titles.map((title) => ({ title, userId: user.id })),
		});

		updateTag("lists");
		return `${titles.length} list${titles.length > 1 ? "s" : ""} added successfully`;
	});
};

export const deleteList = async (id: string) => {
	return safeAction("DELETE_LIST", async (user) => {
		if (!id) throw new Error("ID is invalid");
		await prisma.list.delete({ where: { id, userId: user.id } });
		updateTag("lists");
		return "List deleted successfully";
	});
};

export const updateList = async (id: string, formData: FormData) => {
	return safeAction("UPDATE_LIST", async (user) => {
		const title = formData.get("title") as string;
		await prisma.list.update({
			where: { id, userId: user.id },
			data: { title },
		});
		updateTag("lists");
		return "List updated successfully";
	});
};
