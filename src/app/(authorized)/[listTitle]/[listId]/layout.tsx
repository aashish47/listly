import AlphabetButtons from "@/components/buttons/AlphabetButtons";
import ListButton from "@/components/buttons/ListButton";
import Form from "@/components/Form";
import AlphabetsSkeleton from "@/components/skeletons/AlphabetsSkeleton";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import { addListItem } from "@/lib/actions/list-item-actions";
import { fetchListById } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { ListParamsPromise } from "@/types/params";

import React, { Suspense } from "react";

export async function generateMetadata({
	params,
}: {
	params: ListParamsPromise;
}) {
	const { listId } = await params;
	const user = await getSessionUser();
	const { title } = await fetchListById(user.id, listId);
	return {
		title,
	};
}

export default async function Layout({
	params,
	children,
}: {
	params: ListParamsPromise;
	children: React.ReactNode;
}) {
	return (
		<>
			<Suspense fallback={<HeaderSkeleton />}>
				<ButtonWrapper params={params} />
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<FormWrapper params={params} />
			</Suspense>
			<Suspense fallback={<AlphabetsSkeleton />}>
				<AlphabetButtons />
			</Suspense>

			{children}
		</>
	);
}

const ButtonWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const user = await getSessionUser();
	const { listId } = await params;
	const { title } = await fetchListById(user.id, listId);

	return <ListButton title={title} listId={listId} />;
};

const FormWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const { listId } = await params;
	const addListItemWithId = addListItem.bind(null, listId);
	return <Form action={addListItemWithId} buttonName="add" />;
};
