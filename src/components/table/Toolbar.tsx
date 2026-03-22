import AlphabetsDropdownButton from "@/components/buttons/AlphabetsDropdownButton";
import CopyDropDownMenuButton from "@/components/buttons/CopyDropDownMenuButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ActionPromise } from "@/types/actions";
import { useEffect, useState } from "react";

interface ToolbarProps<T extends SelectableItem> {
	items: T[];
	deleteAction: (ids: string[]) => ActionPromise;
	listSelection: UseListSelectionReturn<T>;
}

const Toolbar = <T extends SelectableItem>({
	items,
	deleteAction,
	listSelection,
}: ToolbarProps<T>) => {
	const {
		isAllSelected,
		isPartialSelected,
		filteredItems,
		resetSelection,
		searchQuery,
		startsWithQuery,
		setStartsWithQuery,
		selectedCount,
		selectedIds,
		selectedInFilter,
		setSearchQuery,
		toggleSelectAll,
		totalFiltered,
	} = listSelection;

	const [localValue, setLocalValue] = useState(searchQuery);

	useEffect(() => {
		setLocalValue(searchQuery);
	}, [searchQuery]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setLocalValue(val);
		setSearchQuery(val);
	};

	const getTargetItems = () => {
		const currentSelection = filteredItems.filter((item) =>
			selectedIds.has(item.id),
		);
		return currentSelection.length === 0 ? filteredItems : currentSelection;
	};

	return (
		<div className="flex flex-wrap items-center gap-2 border-b border-x-transparent bg-background px-3 py-2">
			<div className="flex items-center gap-2 pr-2">
				<Checkbox
					id="select-all"
					checked={
						isAllSelected ? true : isPartialSelected ? "indeterminate" : false
					}
					onCheckedChange={toggleSelectAll}
				/>
			</div>

			<AlphabetsDropdownButton
				items={items}
				listSelection={{ setStartsWithQuery, startsWithQuery }}
			/>

			<div className="min-w-30 flex-1">
				<Input
					placeholder="Search..."
					value={localValue}
					onChange={handleSearchChange}
					className="h-8 bg-muted/50 transition-colors focus-visible:bg-background"
				/>
			</div>

			<div className="mx-1 border-r border-l px-2 text-xs font-medium text-muted-foreground tabular-nums">
				{selectedInFilter} / {totalFiltered}
			</div>

			<CopyDropDownMenuButton items={getTargetItems()} />

			<DeleteButton
				disabled={selectedCount === 0}
				deleteAction={deleteAction.bind(null, Array.from(selectedIds))}
				listSelection={{ resetSelection, selectedCount }}
			/>
		</div>
	);
};

export default Toolbar;
