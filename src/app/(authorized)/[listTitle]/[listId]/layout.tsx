import AlphabetButtons from "@/components/buttons/AlphabetButtons";
import ListButton from "@/components/buttons/ListButton";
import FallbackSkeleton from "@/components/FallbackSkeleton";
import Form from "@/components/Form";
import {
	HEADER_HEIGHT,
	ICON_HEIGHT,
	TEXTAREA_HEIGHT,
} from "@/constants/dimensions";
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
			<Suspense fallback={<FallbackSkeleton size={1} height={HEADER_HEIGHT} />}>
				<ListButton params={params} />
			</Suspense>
			<Suspense
				fallback={
					<div className="flex flex-col gap-2">
						<FallbackSkeleton size={1} height={TEXTAREA_HEIGHT} />
						<FallbackSkeleton size={1} height={ICON_HEIGHT} />
					</div>
				}
			>
				<FormWrapper params={params} />
			</Suspense>
			<Suspense fallback={<FallbackSkeleton size={2} height={ICON_HEIGHT} />}>
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
