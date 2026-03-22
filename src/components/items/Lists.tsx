"use client";

import OuterListItem from "@/components/items/OuterListItem";
import DataTable from "@/components/table/DataTable";
import { deleteManyLists } from "@/lib/actions/list-actions";
import { List } from "@prisma/client";

interface ListsProps {
	lists: List[];
}

const Lists = ({ lists }: ListsProps) => {
	return (
		<DataTable
			deleteAction={deleteManyLists}
			items={lists}
			ItemComponent={OuterListItem}
		/>
	);
};

export default Lists;
