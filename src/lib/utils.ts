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
