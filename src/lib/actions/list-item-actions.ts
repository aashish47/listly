"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { revalidatePath } from "next/cache";

export const addListItem = async (
	listId: string,
	formData: FormData,
	prevState: any,
) => {
	const user = await getSessionUser();

	try {
		const title = (formData.get("word") as string).trim();
		await prisma.listItem.create({
			data: { title, listId },
		});
		revalidatePath("/");
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

export const deleteListItem = async (id: string, prevState: any) => {
	const user = await getSessionUser();

	try {
		if (!id) {
			throw new Error("id invalid");
		}
		await prisma.listItem.delete({ where: { id } });
		revalidatePath("/");
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
	formData: FormData,
	prevState: any,
) => {
	const user = await getSessionUser();
	try {
		const title = formData.get("title") as string;
		await prisma.listItem.update({
			where: { id },
			data: { title },
		});
		revalidatePath("/");
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
