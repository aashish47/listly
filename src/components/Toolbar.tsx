import CopyDropDownMenuButton from "@/components/buttons/CopyDropDownMenuButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import {
	SelectableItem,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ActionPromise } from "@/types/actions";

interface ToolbarProps<T extends SelectableItem> {
	deleteAction: (ids: string[]) => ActionPromise;
	listSelection: UseListSelectionReturn<T>;
}

const Toolbar = <T extends SelectableItem>({
	deleteAction,
	listSelection,
}: ToolbarProps<T>) => {
	const {
		getTargetItems,
		isAllSelected,
		isPartialSelected,
		resetSelection,
		searchQuery,
		selectedCount,
		selectedIds,
		selectedInFilter,
		setSearchQuery,
		toggleSelectAll,
		totalFiltered,
	} = listSelection;

	return (
		<div className="flex flex-wrap items-center gap-2 border-b border-x-transparent px-3 py-2">
			<div className="flex items-center gap-2 pr-4">
				<Checkbox
					id="select-all"
					checked={
						isAllSelected ? true : isPartialSelected ? "indeterminate" : false
					}
					onCheckedChange={toggleSelectAll}
				/>
			</div>

			<div className="ml-auto self-center text-sm font-medium whitespace-nowrap text-muted-foreground">
				{selectedInFilter} / {totalFiltered}
			</div>

			<div className="flex-1">
				<Input
					placeholder="Search..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="h-8"
				/>
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
