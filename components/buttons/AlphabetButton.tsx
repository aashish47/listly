"use client";
import { Button } from "@/components/ui/button"; // Adjust path based on your setup
import Link from "next/link";
import { useParams } from "next/navigation";

export const AlphabetButton = ({ alpha }: { alpha: string }) => {
	const params = useParams();

	const isActive = alpha === params.alpha;

	return (
		<Button
			asChild
			variant={isActive ? "default" : "outline"}
			className="h-10 w-10 capitalize"
		>
			<Link href={`/${alpha}`}>{alpha}</Link>
		</Button>
	);
};
