"use server";

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/server-utils";
import { parseMultilineInput } from "@/lib/utils";
import { updateTag } from "next/cache";

export const addListItem = async (listId: string, formData: FormData) => {
	return safeAction("ADD_LIST_ITEM", async () => {
		const titles = parseMultilineInput(formData.get("titles") as string);
		if (titles.length === 0) throw new Error("No items provided");

		await prisma.listItem.createMany({
			data: titles.map((title) => ({ title, listId })),
		});

		updateTag(`list-${listId}`);
		titles.forEach((t) => updateTag(`list-${listId}-${t.charAt(0)}`));

		return `${titles.length} item${titles.length > 1 ? "s" : ""} added successfully`;
	});
};

export const deleteListItem = async (id: string, prevTitle: string) => {
	return safeAction("DELETE_LIST_ITEM", async () => {
		if (!id) throw new Error("ID invalid");
		const { listId, title } = await prisma.listItem.delete({ where: { id } });

		updateTag(`list-${listId}`);
		updateTag(`list-${listId}-${title.charAt(0)}`);
		updateTag(`list-${listId}-${prevTitle.charAt(0)}`);

		return "Item deleted successfully";
	});
};

export const updateListItem = async (
	id: string,
	prevTitle: string,
	formData: FormData,
) => {
	return safeAction("UPDATE_LIST_ITEM", async () => {
		const title = formData.get("title") as string;
		const { listId } = await prisma.listItem.update({
			where: { id },
			data: { title },
		});

		updateTag(`list-${listId}`);
		updateTag(`list-${listId}-${title.charAt(0)}`);
		updateTag(`list-${listId}-${prevTitle.charAt(0)}`);

		return "Item updated successfully";
	});
};
