import AddButton from "@/components/buttons/AddButton";
import AlphabetsDropdownButton from "@/components/buttons/AlphabetsDropdownButton";
import CopyDropDownMenuButton from "@/components/buttons/CopyDropDownMenuButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import { useItem } from "@/components/contexts/item-provider";
import { useItems } from "@/components/contexts/items-provider";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import Searchbar from "@/components/table/Searchbar";
import { Checkbox } from "@/components/ui/checkbox";
import { addList, deleteManyLists } from "@/lib/actions/list-actions";
import {
	addListItem,
	deleteManyListItems,
} from "@/lib/actions/list-item-actions";
import { useParams } from "next/navigation";

interface ToolbarProps<T extends SelectableItem> {
	listSelection: UseListSelectionReturn<T>;
}

const Toolbar = <T extends SelectableItem>({
	listSelection,
}: ToolbarProps<T>) => {
	const items = useItems<T>();
	const { title } = useItem();
	const { listId } = useParams();
	const id = typeof listId === "string" ? listId : undefined;

	// Define the two modes
	const modes = {
		add: {
			action: addListItem.bind(null, id!), // id exists if we are in 'add' mode
			deleteAction: deleteManyListItems,
			type: "add" as const,
		},
		create: {
			action: addList,
			deleteAction: deleteManyLists,
			type: "create" as const,
		},
	};

	// Select the mode based on whether id exists
	const currentMode = id ? modes.add : modes.create;
	const { action: addAction, deleteAction, type: formType } = currentMode;

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

			<AddButton title={title} addAction={addAction} formType={formType} />

			<DeleteButton
				disabled={selectedCount === 0}
				deleteAction={deleteAction.bind(null, Array.from(selectedIds))}
				listSelection={{ resetSelection, selectedCount }}
			/>
		</div>
	);
};

export default Toolbar;
