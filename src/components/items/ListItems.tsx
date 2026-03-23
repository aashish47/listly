"use client";

import InnerListItem from "@/components/items/InnerListItem";
import DataTable from "@/components/table/DataTable";
import { deleteManyListItems } from "@/lib/actions/list-item-actions";

const ListItems = () => {
	return (
		<DataTable
			deleteAction={deleteManyListItems}
			ItemComponent={InnerListItem}
		/>
	);
};

export default ListItems;
