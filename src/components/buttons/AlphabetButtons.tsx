"use client";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import { Button } from "@/components/ui/button";
import alphabets from "@/constants/alphabets";

interface AlphabetButtonsProps<T extends SelectableItem> {
	listSelection: Pick<
		UseListSelectionReturn<T>,
		"startsWithQuery" | "setStartsWithQuery"
	>;
}

const AlphabetButtons = <T extends SelectableItem>({
	listSelection,
}: AlphabetButtonsProps<T>) => {
	const { startsWithQuery, setStartsWithQuery } = listSelection;
	const activeAlpha = startsWithQuery?.toLowerCase();

	return (
		<div className="flex flex-wrap justify-center gap-3">
			{alphabets.map((char) => (
				<Button
					key={char}
					variant={activeAlpha === char ? "default" : "outline"}
					size="icon"
					className="capitalize"
					onClick={() =>
						activeAlpha === char
							? setStartsWithQuery("")
							: setStartsWithQuery(char)
					}
				>
					{char}
				</Button>
			))}
		</div>
	);
};

export default AlphabetButtons;
