import { SelectableItem } from "@/components/hooks/useListSelection";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ChevronDown, Copy, FileJson, Type } from "lucide-react";
import { toast } from "sonner";

interface CopyDropDownMenuButtonProps<T extends SelectableItem> {
	items: T[];
}

const CopyDropDownMenuButton = <T extends SelectableItem>({
	items,
}: CopyDropDownMenuButtonProps<T>) => {
	const copyFullObject = () => {
		navigator.clipboard.writeText(JSON.stringify(items, null, 2));
		toast.success(`${items.length} items copied as JSON`, {
			description: format(Date.now(), "PPPPpp"),
		});
	};

	const copyTitlesOnly = () => {
		const text = items.map(({ title }) => title).join("\n");
		navigator.clipboard.writeText(text);
		toast.success(`${items.length} titles copied`, {
			description: format(Date.now(), "PPPPpp"),
		});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 gap-2">
					<Copy className="h-4 w-4" />
					<ChevronDown className="h-3 w-3 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-40">
				<DropdownMenuItem onClick={copyFullObject} className="gap-2">
					<FileJson className="h-4 w-4 text-muted-foreground" />
					<span>Copy JSON</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={copyTitlesOnly} className="gap-2">
					<Type className="h-4 w-4 text-muted-foreground" />
					<span>Copy Titles</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CopyDropDownMenuButton;
