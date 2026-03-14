"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { revalidatePath } from "next/cache";

export const addList = async (prevState: any, formData: FormData) => {
	const user = await getSessionUser();
	try {
		const title = (formData.get("word") as string).trim();
		await prisma.list.create({
			data: { title, userId: user.id },
		});
		revalidatePath("/");
		return { message: `Success! ${title} added`, date: Date.now() };
	} catch (err: any) {
		throw new Error(`Error adding list ${err}`);
	}
};

export const deleteList = async (id: string, prevState: any) => {
	const user = await getSessionUser();
	try {
		if (!id) {
			throw new Error("id invalid");
		}
		await prisma.list.delete({ where: { id, userId: user.id } });
		revalidatePath("/");
		return { message: `Deleted!`, date: Date.now() };
	} catch (err) {
		throw new Error(`Error deleting word ${err}`);
	}
};

export const updateList = async (
	id: string,
	prevState: any,
	formData: FormData,
) => {
	const user = await getSessionUser();
	try {
		const title = formData.get("word") as string;
		await prisma.list.update({
			where: { id, userId: user.id },
			data: { title },
		});
		revalidatePath("/");
		return { message: `Updated!`, date: Date.now() };
	} catch (err) {
		throw new Error(`Error updating word ${err}`);
	}
};
