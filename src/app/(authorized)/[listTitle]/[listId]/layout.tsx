import AlphabetButtons from "@/components/buttons/AlphabetButtons";
import ListButton from "@/components/buttons/ListButton";
import Form from "@/components/Form";
import AlphabetsSkeleton from "@/components/skeletons/AlphabetsSkeleton";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import { addListItem } from "@/lib/actions/list-item-actions";
import { ListParamsPromise } from "@/types/params";

import React, { Suspense } from "react";

export async function generateMetadata({
	params,
}: {
	params: ListParamsPromise;
}) {
	const { listTitle } = await params;
	return {
		title: decodeURIComponent(listTitle),
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
				<ListButton params={params} />
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

const FormWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const { listId } = await params;
	const addListItemWithId = addListItem.bind(null, listId);
	return <Form action={addListItemWithId} buttonName="add" />;
};
