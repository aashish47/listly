import Form from "@/components/form/Form";
import { EmptyList } from "@/components/items/EmptyList";
import ListItems from "@/components/items/ListItems";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import IconSkeleton from "@/components/skeletons/IconSkeleton";
import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import { ICON_HEIGHT } from "@/constants/dimensions";
import { addListItem } from "@/lib/actions/list-item-actions";
import { fetchListItems } from "@/lib/data/list-item-queries";
import { fetchListById } from "@/lib/data/list-queries";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { slugify } from "@/lib/utils";
import { ListParamsPromise } from "@/types/params";
import { Suspense } from "react";

export async function generateStaticParams() {
	const lists = await prisma.list.findMany({
		select: { id: true, title: true },
	});

	return lists.map(({ id, title }) => {
		return { listId: id, listTitle: slugify(title) };
	});
}

const Page = async ({ params }: { params: ListParamsPromise }) => {
	return (
		<>
			<Suspense fallback={<IconSkeleton />}>
				<ListName params={params} />
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<FormWrapper params={params} />
			</Suspense>
			<Suspense fallback={<ItemSkeleton />}>
				<ListItemsWrapper params={params} />
			</Suspense>
		</>
	);
};

const ListName = async ({ params }: { params: ListParamsPromise }) => {
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

const FormWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const { listId } = await params;
	const addListItemWithId = addListItem.bind(null, listId);
	return <Form action={addListItemWithId} buttonName="add" />;
};

const ListItemsWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const { listId } = await params;
	const { id } = await getSessionUser();
	const listItems = await fetchListItems(listId, id);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<EmptyList type="items" />
	);
};

export default Page;
