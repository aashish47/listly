"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInitials } from "@/contexts/initials-provider";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/hooks/useListSelection";
import { ChevronDown } from "lucide-react";

interface AlphabetsDropdownButtonProps<T extends SelectableItem> {
	listSelection: Pick<
		UseListSelectionReturn<T>,
		"startsWithQuery" | "setStartsWithQuery"
	>;
}

const AlphabetsDropdownButton = <T extends SelectableItem>({
	listSelection,
}: AlphabetsDropdownButtonProps<T>) => {
	const availableInitials = useInitials();
	const { startsWithQuery, setStartsWithQuery } = listSelection;
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 gap-2 px-2 font-medium transition-all hover:bg-accent active:scale-95"
				>
					<span className="max-w-15 min-w-5 truncate tracking-tight uppercase">
						{startsWithQuery || "A-Z"}
					</span>
					<ChevronDown className="h-3 w-3 opacity-50" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				className="w-55 p-3 shadow-xl ring-1 ring-black/5"
			>
				<div className="mb-3 flex items-center justify-between px-1">
					<span className="text-[10px] font-bold tracking-widest text-muted-foreground/70 uppercase">
						Filter by Initial
					</span>
				</div>

				<div className="grid grid-cols-6 gap-1.5">
					<DropdownMenuItem
						onClick={() => setStartsWithQuery("")}
						className={`col-span-2 h-8 cursor-pointer justify-center border text-[11px] font-bold transition-all ${
							!startsWithQuery
								? "bg-primary text-primary-foreground"
								: "bg-background"
						} `}
					>
						ALL
					</DropdownMenuItem>

					{alphabet.map((char) => {
						const hasItems = availableInitials.includes(char);
						const isActive =
							startsWithQuery.toLowerCase() === char.toLowerCase();

						return (
							<DropdownMenuItem
								key={char}
								disabled={!hasItems}
								onClick={() => setStartsWithQuery(char)}
								className={`h-8 w-8 cursor-pointer justify-center border p-0 text-[11px] font-semibold shadow-sm transition-all ${
									isActive
										? "bg-primary text-primary-foreground"
										: "bg-background"
								} ${!hasItems ? "cursor-not-allowed opacity-20 grayscale" : "active:scale-90"} `}
							>
								{char}
							</DropdownMenuItem>
						);
					})}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AlphabetsDropdownButton;
