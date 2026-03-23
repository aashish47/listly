import Form from "@/components/form/Form";
import { EmptyList } from "@/components/items/EmptyList";
import ListItems from "@/components/items/ListItems";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import IconSkeleton from "@/components/skeletons/IconSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { ICON_HEIGHT } from "@/constants/dimensions";
import { addListItem } from "@/lib/actions/list-item-actions";
import {
	fetchListItems,
	fetchListItemsInitials,
} from "@/lib/data/list-item-queries";
import { fetchListById } from "@/lib/data/list-queries";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { normalizeSearchParamToString, slugify } from "@/lib/utils";
import { PageProps } from "@/types/params";
import { Suspense } from "react";

export async function generateStaticParams() {
	const lists = await prisma.list.findMany({
		select: { id: true, title: true },
	});

	return lists.map(({ id, title }) => {
		return { listId: id, listTitle: slugify(title) };
	});
}

const Page = async ({ params, searchParams }: PageProps) => {
	return (
		<>
			<Suspense fallback={<IconSkeleton />}>
				<ListName params={params} searchParams={searchParams} />
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<FormWrapper params={params} searchParams={searchParams} />
			</Suspense>
			<Suspense fallback={<TableSkeleton />}>
				<ListItemsWrapper params={params} searchParams={searchParams} />
			</Suspense>
		</>
	);
};

const ListName = async ({ params, searchParams }: PageProps) => {
	const user = await getSessionUser();
	const { listId } = await params;
	const { title } = await fetchListById(user.id, listId);

	return (
		<div
			className="shrink-0 content-center text-center text-2xl"
			style={{ height: `${ICON_HEIGHT}px` }}
		>
			{title}
		</div>
	);
};

const FormWrapper = async ({ params, searchParams }: PageProps) => {
	const { listId } = await params;
	const addListItemWithId = addListItem.bind(null, listId);
	return <Form action={addListItemWithId} buttonName="add" />;
};

const ListItemsWrapper = async ({ params, searchParams }: PageProps) => {
	const [user, rParams, sParams] = await Promise.all([
		getSessionUser(),
		params,
		normalizeSearchParamToString(searchParams),
	]);

	const userId = user.id;
	const { listId } = rParams;
	const { q, prefix } = sParams;

	const [listItems, availableInitials] = await Promise.all([
		fetchListItems(listId, userId, { q, prefix }),
		fetchListItemsInitials(listId, userId),
	]);

	return availableInitials.length > 0 ? (
		<ListItems availableInitials={availableInitials} listItems={listItems} />
	) : (
		<EmptyList type="items" />
	);
};

export default Page;
