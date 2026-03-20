"use server";

import alphabets from "@/constants/alphabets";
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
		await prisma.list.delete({
			where: { id, userId: user.id },
		});
		updateTag("lists");
		updateTag(`list-${id}`);
		alphabets.map((alpha) => updateTag(`list-${id}-${alpha}`));
		return "List deleted successfully";
	});
};
export const deleteManyLists = async (ids: string[]) => {
	return safeAction("DELETE_MANY_LIST_ITEMS", async (user) => {
		if (!ids || ids.length === 0) throw new Error("No IDs provided");

		const items = await prisma.list.findMany({
			where: { id: { in: ids }, userId: user.id },
			select: { id: true },
		});

		if (items.length === 0) throw new Error("No items found to delete");

		const { count } = await prisma.list.deleteMany({
			where: { id: { in: ids } },
		});

		updateTag("lists");
		items.forEach(({ id }) => {
			updateTag(`list-${id}`);
			alphabets.forEach((alpha) => updateTag(`list-${id}-${alpha}`));
		});

		return `${count} item${count > 1 ? "s" : ""} deleted successfully`;
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
