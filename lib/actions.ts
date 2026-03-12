"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addWord = async (prevState: any, formData: FormData) => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const userId = user.data.user?.id;
	if (!userId) {
		throw new Error("No UserId");
	}
	try {
		const word = (formData.get("word") as string).trim().toLowerCase();
		await prisma.vocabulary.create({ data: { word, userId } });
		revalidatePath("/");
		return { message: `Success! ${word} added`, date: Date.now() };
	} catch (err: any) {
		throw new Error(`Error adding word ${err}`);
	}
};

export const deleteWord = async (id: number, prevState: any) => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const userId = user.data.user?.id;
	if (!userId) {
		throw new Error("No UserId");
	}
	try {
		if (!id) {
			throw new Error("id invalid");
		}
		await prisma.vocabulary.delete({ where: { id, userId } });
		revalidatePath("/");
		return { message: `Deleted!`, date: Date.now() };
	} catch (err) {
		throw new Error(`Error deleting word ${err}`);
	}
};

export const fetchVocabulary = async () => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const userId = user.data.user?.id;
	if (!userId) {
		throw new Error("No UserId");
	}
	try {
		return await prisma.vocabulary.findMany({
			where: { userId },
			orderBy: { word: "asc" },
		});
	} catch (err) {
		throw new Error(`Error fetching vocabulary ${err}`);
	}
};

export const fetchVocabularyByAlpha = async (alpha: string) => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const userId = user.data.user?.id;
	if (!userId) {
		throw new Error("No UserId");
	}
	try {
		return await prisma.vocabulary.findMany({
			orderBy: { word: "asc" },
			where: { userId, word: { startsWith: alpha.toLowerCase() } },
		});
	} catch (err) {
		throw new Error(`Error fetching vocabulary ${err}`);
	}
};

export const fetchWord = async (id: number) => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const userId = user.data.user?.id;
	if (!userId) {
		throw new Error("No UserId");
	}
	try {
		return await prisma.vocabulary.findUnique({ where: { id, userId } });
	} catch (err) {
		console.log(err);
		throw new Error(`Error fetching word ${err}`);
	}
};

export const updateWord = async (
	id: number,
	prevState: any,
	formData: FormData,
) => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const userId = user.data.user?.id;
	if (!userId) {
		throw new Error("No UserId");
	}
	try {
		const word = formData.get("word") as string;
		await prisma.vocabulary.update({
			where: { id, userId },
			data: { word },
		});
		revalidatePath("/");
		return { message: `Updated!`, date: Date.now() };
	} catch (err) {
		throw new Error(`Error updating word ${err}`);
	}
};

export const logout = async () => {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(`Error logging out ${error}`);
	} else {
		redirect("/");
	}
};
