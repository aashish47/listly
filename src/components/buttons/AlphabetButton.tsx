"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface AlphabetButtonProps {
	char: string;
}

export const AlphabetButton = ({ char }: AlphabetButtonProps) => {
	const { listId, alpha } = useParams<{ listId: string; alpha: string }>();
	const isActive = alpha && char === alpha.toLowerCase();

	return (
		<Button
			asChild
			variant={isActive ? "default" : "outline"}
			className="h-10 w-10 capitalize"
		>
			<Link href={`/${listId}/${char}`}>{char}</Link>
		</Button>
	);
};
