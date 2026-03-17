"use client";
import { Button } from "@/components/ui/button";
import alphabets from "@/constants/alphabets";
import { ListParams } from "@/types/params";
import Link from "next/link";
import { useParams } from "next/navigation";

const AlphabetButtons = () => {
	const { listId, alpha } = useParams<ListParams>();
	const activeAlpha = alpha?.toLowerCase();

	return (
		<div className="flex flex-wrap justify-center gap-3">
			{alphabets.map((char) => (
				<Button
					key={char}
					asChild
					variant={activeAlpha === char ? "default" : "outline"}
					size="icon"
					className="capitalize"
				>
					<Link href={`/${listId}/${char}`}>{char}</Link>
				</Button>
			))}
		</div>
	);
};

export default AlphabetButtons;
