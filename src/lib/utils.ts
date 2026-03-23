import { ParsedSearchParams } from "@/types/params";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseMultilineInput(input: string | null): string[] {
	if (!input) return [];
	return input
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter((l) => l.length > 0);
}

export const actionResponse = (success: boolean, message: string) => ({
	success,
	message,
	date: Date.now(),
});

export const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const slugify = (text: string) => {
	return text
		.toLowerCase()
		.trim() // Remove spaces from start/end
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w\-]+/g, "") // Remove all non-word chars (emojis, punctuation)
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

export const normalizeSearchParamToString = async (
	searchParams: Promise<ParsedSearchParams>,
) => {
	const sp = await searchParams;
	const q = typeof sp.q === "string" ? sp.q : undefined;
	const prefix = typeof sp.prefix === "string" ? sp.prefix : undefined;
	return { q, prefix };
};
