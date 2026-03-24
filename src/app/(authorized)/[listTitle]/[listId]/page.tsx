import InitialsProvider from "@/components/contexts/initials-provider";
import ItemProvider from "@/components/contexts/item-provider";
import ItemsProvider from "@/components/contexts/items-provider";
import IconSkeleton from "@/components/skeletons/IconSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import DataTable from "@/components/table/DataTable";
import { ICON_HEIGHT } from "@/constants/dimensions";
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
			className="shrink-0 content-center truncate text-center md:text-2xl"
			style={{ height: `${ICON_HEIGHT}px` }}
		>
			{title}
		</div>
	);
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

	return (
		<ItemProvider item={fetchListById(userId, listId)}>
			<ItemsProvider items={fetchListItems(listId, userId, { q, prefix })}>
				<InitialsProvider initials={fetchListItemsInitials(listId, userId)}>
					<DataTable />
				</InitialsProvider>
			</ItemsProvider>
		</ItemProvider>
	);
};

export default Page;
