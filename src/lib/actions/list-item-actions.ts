"use server";

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/server-utils";
import { parseMultilineInput } from "@/lib/utils";
import { updateTag } from "next/cache";

export const addListItem = async (listId: string, formData: FormData) => {
	return safeAction("ADD_LIST_ITEM", async (user) => {
		const list = await prisma.list.findFirst({
			where: { id: listId, userId: user.id },
		});
		if (!list) throw new Error("List does not exist");

		const titles = parseMultilineInput(formData.get("titles") as string);
		if (titles.length === 0) throw new Error("No items provided");

		const data = titles.map((title) => ({ title, listId }));

		await prisma.listItem.createMany({
			data,
		});

		updateTag(`list-${listId}`);

		return `${titles.length} item${titles.length > 1 ? "s" : ""} added successfully`;
	});
};

export const deleteListItem = async (id: string) => {
	return safeAction("DELETE_LIST_ITEM", async (user) => {
		if (!id) throw new Error("ID invalid");
		const { listId } = await prisma.listItem.delete({
			where: {
				id,
				list: {
					userId: user.id,
				},
			},
		});

		updateTag(`list-${listId}`);

		return "Item deleted successfully";
	});
};

export const deleteManyListItems = async (ids: string[]) => {
	return safeAction("DELETE_MANY_LIST_ITEMS", async (user) => {
		if (!ids || ids.length === 0) throw new Error("No IDs provided");

		const items = await prisma.listItem.findMany({
			where: {
				id: { in: ids },
				list: {
					userId: user.id,
				},
			},
			select: { listId: true, title: true },
		});

		if (items.length === 0) throw new Error("No items found to delete");

		const listId = items[0].listId;

		const { count } = await prisma.listItem.deleteMany({
			where: { id: { in: ids } },
		});

		updateTag(`list-${listId}`);

		return `${count} item${count > 1 ? "s" : ""} deleted successfully`;
	});
};

export const updateListItem = async (id: string, formData: FormData) => {
	return safeAction("UPDATE_LIST_ITEM", async (user) => {
		const title = formData.get("title") as string;
		const { listId } = await prisma.listItem.update({
			where: {
				id,
				list: {
					userId: user.id,
				},
			},
			data: { title },
		});

		updateTag(`list-${listId}`);

		return "Item updated successfully";
	});
};
