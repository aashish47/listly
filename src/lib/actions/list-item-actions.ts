"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { revalidatePath } from "next/cache";

export const addListItem = async (
	listId: string,
	prevState: any,
	formData: FormData,
) => {
	const user = await getSessionUser();
	try {
		const title = (formData.get("word") as string).trim();
		await prisma.listItem.create({
			data: { title, listId },
		});
		revalidatePath("/");
		return { message: `Success! ${title} added`, date: Date.now() };
	} catch (err: any) {
		throw new Error(`Error adding list ${err}`);
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
		return { message: `Deleted!`, date: Date.now() };
	} catch (err) {
		throw new Error(`Error deleting word ${err}`);
	}
};

export const updateListItem = async (
	id: string,
	prevState: any,
	formData: FormData,
) => {
	const user = await getSessionUser();
	try {
		const title = formData.get("word") as string;
		await prisma.listItem.update({
			where: { id },
			data: { title },
		});
		revalidatePath("/");
		return { message: `Updated!`, date: Date.now() };
	} catch (err) {
		throw new Error(`Error updating word ${err}`);
	}
};
