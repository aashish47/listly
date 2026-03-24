import AlphabetsDropdownButton from "@/components/buttons/AlphabetsDropdownButton";
import CopyDropDownMenuButton from "@/components/buttons/CopyDropDownMenuButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import { useItems } from "@/components/contexts/items-provider";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import Searchbar from "@/components/table/Searchbar";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionPromise } from "@/types/actions";

interface ToolbarProps<T extends SelectableItem> {
	deleteAction: (ids: string[]) => ActionPromise;
	listSelection: UseListSelectionReturn<T>;
}

const Toolbar = <T extends SelectableItem>({
	deleteAction,
	listSelection,
}: ToolbarProps<T>) => {
	const items = useItems<T>();

	const {
		isAllSelected,
		isPartialSelected,
		resetSelection,
		searchQuery,
		startsWithQuery,
		setStartsWithQuery,
		selectedCount,
		selectedIds,
		setSearchQuery,
		toggleSelectAll,
		totalItems,
	} = listSelection;

	const getTargetItems = () => {
		const currentSelection = items.filter((item) => selectedIds.has(item.id));
		return currentSelection.length === 0 ? items : currentSelection;
	};

	return (
		<div className="flex flex-wrap items-center gap-2 border-t border-b border-x-transparent border-t-transparent bg-background px-3 py-2">
			<div className="flex items-center gap-2">
				<Checkbox
					id="select-all"
					checked={
						isAllSelected ? true : isPartialSelected ? "indeterminate" : false
					}
					onCheckedChange={toggleSelectAll}
				/>
			</div>

			<AlphabetsDropdownButton
				listSelection={{ setStartsWithQuery, startsWithQuery }}
			/>

			<div className="flex-1">
				<Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>

			<div className="mx-1 hidden border-r border-l px-2 text-xs font-medium text-muted-foreground tabular-nums sm:block">
				{selectedCount} / {totalItems}
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
