import Alphabets from "@/components/Alphabets";
import FallbackList from "@/components/FallbackList";
import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { addListItem } from "@/lib/actions/list-item-actions";
import { fetchListById } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import Link from "next/link";

import React, { Suspense } from "react";

export default async function Layout({
	params,
	children,
}: {
	params: Promise<{ listId: string }>;
	children: React.ReactNode;
}) {
	return (
		<>
			<Suspense fallback={<FallbackList size={1} height={12} />}>
				<ListButton params={params} />
			</Suspense>
			<Suspense fallback={<FallbackList size={1} height={10} />}>
				<FormWrapper params={params} />
			</Suspense>
			<Suspense fallback={<FallbackList size={2} height={8} />}>
				<Alphabets />
			</Suspense>

			{children}
		</>
	);
}

const ListButton = async ({
	params,
}: {
	params: Promise<{ listId: string }>;
}) => {
	const { listId } = await params;
	const user = await getSessionUser();
	const { title } = await fetchListById(user.id, listId);
	return (
		<Button asChild variant="secondary" className="h-12">
			<Link href={`/${listId}`}>{title}</Link>
		</Button>
	);
};

const FormWrapper = async ({
	params,
}: {
	params: Promise<{
		listId: string;
	}>;
}) => {
	const { listId } = await params;
	const addListItemWithId = addListItem.bind(null, listId);
	return <Form action={addListItemWithId} buttonName="add" />;
};
