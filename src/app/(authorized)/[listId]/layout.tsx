import Alphabets from "@/components/Alphabets";
import Form from "@/components/Form";
import { addListItem } from "@/lib/actions/list-item-actions";
import React from "react";

export default async function Layout({
	params,
	children,
}: {
	params: { listId: string };
	children: React.ReactNode;
}) {
	const { listId } = await params;
	const addListItemWithId = addListItem.bind(null, listId);

	return (
		<>
			<Form
				action={addListItemWithId}
				buttonType="add"
				inputDefault=""
				color="btn-teal"
			/>
			<Alphabets />
			{children}
		</>
	);
}
