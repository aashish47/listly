"use client";

import OuterListItem from "@/components/items/OuterListItem";
import DataTable from "@/components/table/DataTable";
import { deleteManyLists } from "@/lib/actions/list-actions";

const Lists = () => {
	return (
		<DataTable deleteAction={deleteManyLists} ItemComponent={OuterListItem} />
	);
};

export default Lists;
