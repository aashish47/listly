"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { updateTag } from "next/cache";

export const addListItem = async (listId: string, formData: FormData) => {
	const user = await getSessionUser();

	try {
		const title = (formData.get("title") as string).trim();
		await prisma.listItem.create({
			data: { title, listId },
		});

		updateTag(`list-${listId}`);
		updateTag(`list-${listId}-${title.charAt(0)}`);

		return {
			success: true,
			message: `Item added successfully`,
			date: Date.now(),
		};
	} catch (err: any) {
		console.error("ADD_LIST_ITEM_ERROR:", err);
		return {
			success: false,
			message: `Something went wrong. The item couldn't be added.`,
			date: Date.now(),
		};
	}
};

export const deleteListItem = async (id: string, prevTitle: string) => {
	const user = await getSessionUser();

	try {
		if (!id) {
			throw new Error("id invalid");
		}
		const { listId, title } = await prisma.listItem.delete({ where: { id } });
		updateTag(`list-${listId}`);
		updateTag(`list-${listId}-${title.charAt(0)}`);
		updateTag(`list-${listId}-${prevTitle.charAt(0)}`);
		return {
			success: true,
			message: `Item deleted successfully`,
			date: Date.now(),
		};
	} catch (err) {
		console.error("DELETE_LIST_ITEM_ERROR:", err);
		return {
			success: false,
			message: `Something went wrong. The item couldn't be deleted.`,
			date: Date.now(),
		};
	}
};

export const updateListItem = async (
	id: string,
	prevTitle: string,
	formData: FormData,
) => {
	const user = await getSessionUser();
	try {
		const title = formData.get("title") as string;
		const { listId } = await prisma.listItem.update({
			where: { id },
			data: { title },
		});

		updateTag(`list-${listId}`);
		updateTag(`list-${listId}-${title.charAt(0)}`);
		updateTag(`list-${listId}-${prevTitle.charAt(0)}`);

		return {
			success: true,
			message: `Item updated successfully`,
			date: Date.now(),
		};
	} catch (err) {
		console.error("UPDATE_LIST_ITEM_ERROR:", err);
		return {
			success: false,
			message: `Something went wrong. The item couldn't be updated.`,
			date: Date.now(),
		};
	}
};
