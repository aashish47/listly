"use client";

import {
	SelectableItem,
	useListSelection,
	UseListSelectionReturn,
} from "@/components/hooks/useListSelection";
import Toolbar from "@/components/table/Toolbar";
import { ActionPromise } from "@/types/actions";
import { Virtuoso } from "react-virtuoso";

interface DataTableProps<T extends SelectableItem> {
	availableInitials: string[];
	deleteAction: (ids: string[]) => ActionPromise;
	items: T[];
	ItemComponent: React.ComponentType<{
		item: T;
		listSelection: Pick<
			UseListSelectionReturn<T>,
			"resetSelection" | "selectedIds" | "toggleSelect"
		>;
	}>;
}

const DataTable = <T extends SelectableItem>({
	availableInitials,
	deleteAction,
	items,
	ItemComponent,
}: DataTableProps<T>) => {
	const listSelection = useListSelection(items);
	const { resetSelection, selectedIds, toggleSelect, totalFiltered } =
		listSelection;

	return (
		<div className="flex h-full grow flex-col gap-2">
			<Toolbar
				availableInitials={availableInitials}
				items={items}
				deleteAction={deleteAction}
				listSelection={listSelection}
			/>

			<div className="grow">
				<Virtuoso
					className="no-scrollbar"
					data={items}
					fixedItemHeight={64} // item height(56px) + padding-bottom(8px)
					overscan={500}
					totalCount={totalFiltered}
					itemContent={(index, item) => (
						<ItemComponent
							item={item}
							listSelection={{
								resetSelection,
								selectedIds,
								toggleSelect,
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default DataTable;
