import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SearchbarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchbarProps) => {
	const [localValue, setLocalValue] = useState(searchQuery);

	useEffect(() => {
		setLocalValue(searchQuery);
	}, [searchQuery]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setLocalValue(val);
		setSearchQuery(val);
	};

	const handleClear = () => {
		setLocalValue("");
		setSearchQuery("");
	};

	return (
		<div className="relative w-full">
			<Input
				placeholder="Search..."
				value={localValue}
				onChange={handleSearchChange}
				className="h-8 bg-muted/50 pr-8 transition-colors focus-visible:bg-background"
			/>
			{localValue && (
				<Button
					type="button"
					onClick={handleClear}
					variant={"ghost"}
					size={"icon"}
					className="absolute top-0 right-0 h-full px-2 py-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
					aria-label="Clear search"
				>
					<X className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
};

export default Searchbar;
