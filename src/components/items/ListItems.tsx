"use client";

import InnerListItem from "@/components/items/InnerListItem";
import DataTable from "@/components/table/DataTable";
import { deleteManyListItems } from "@/lib/actions/list-item-actions";
import { ListItem } from "@prisma/client";

interface ListItemsProps {
	availableInitials: string[];
	listItems: ListItem[];
}

const ListItems = ({ availableInitials, listItems }: ListItemsProps) => {
	return (
		<DataTable
			availableInitials={availableInitials}
			deleteAction={deleteManyListItems}
			items={listItems}
			ItemComponent={InnerListItem}
		/>
	);
};

export default ListItems;
