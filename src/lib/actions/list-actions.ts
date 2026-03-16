"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { updateTag } from "next/cache";

export const addList = async (formData: FormData, prevState: any) => {
	const user = await getSessionUser();
	try {
		const title = (formData.get("word") as string).trim();
		await prisma.list.create({
			data: { title, userId: user.id },
		});
		updateTag("lists");
		return {
			success: true,
			message: `List added successfully`,
			date: Date.now(),
		};
	} catch (err: any) {
		console.error("ADD_LIST_ERROR:", err);
		return {
			success: false,
			message: `Something went wrong. The item couldn't be added.`,
			date: Date.now(),
		};
	}
};

export const deleteList = async (id: string, prevState: any) => {
	const user = await getSessionUser();
	try {
		if (!id) {
			throw new Error("id invalid");
		}
		await prisma.list.delete({ where: { id, userId: user.id } });
		updateTag("lists");
		return {
			success: true,
			message: "List deleted successfully",
			date: Date.now(),
		};
	} catch (err) {
		console.error("DELETE_LIST_ERROR:", err);
		return {
			success: false,
			message: "Something went wrong. The item couldn't be deleted.",
			date: Date.now(),
		};
	}
};

export const updateList = async (
	id: string,
	formData: FormData,
	prevState: any,
) => {
	const user = await getSessionUser();
	try {
		const title = formData.get("title") as string;
		await prisma.list.update({
			where: { id, userId: user.id },
			data: { title },
		});
		updateTag("lists");
		return {
			success: true,
			message: "List updated successfully",
			date: Date.now(),
		};
	} catch (err) {
		console.error("UPDATE_LIST_ERROR:", err);
		return {
			success: false,
			message: "Something went wrong. The item couldn't be updated.",
			date: Date.now(),
		};
	}
};
