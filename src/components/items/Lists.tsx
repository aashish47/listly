"use client";

import OuterListItem from "@/components/items/OuterListItem";
import DataTable from "@/components/table/DataTable";
import { deleteManyLists } from "@/lib/actions/list-actions";
import { List } from "@prisma/client";

interface ListsProps {
	availableInitials: string[];
	lists: List[];
}

const Lists = ({ availableInitials, lists }: ListsProps) => {
	return (
		<DataTable
			availableInitials={availableInitials}
			deleteAction={deleteManyLists}
			items={lists}
			ItemComponent={OuterListItem}
		/>
	);
};

export default Lists;
