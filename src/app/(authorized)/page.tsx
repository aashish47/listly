import InitialsProvider from "@/components/contexts/initials-provider";
import ItemsProvider from "@/components/contexts/items-provider";
import Form from "@/components/form/Form";
import Lists from "@/components/items/Lists";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { ICON_HEIGHT } from "@/constants/dimensions";
import { addList } from "@/lib/actions/list-actions";
import { fetchLists, fetchListsInitials } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { normalizeSearchParamToString } from "@/lib/utils";
import { PageProps } from "@/types/params";
import { Suspense } from "react";

const Page = async ({ params, searchParams }: PageProps) => {
	return (
		<>
			<div
				className="shrink-0 content-center text-center"
				style={{ height: `${ICON_HEIGHT}px` }}
			>
				{""}
			</div>
			<Suspense fallback={<FormSkeleton />}>
				<Form action={addList} buttonName="create" />
			</Suspense>
			<Suspense fallback={<TableSkeleton />}>
				<ListsWrapper params={params} searchParams={searchParams} />
			</Suspense>
		</>
	);
};

const ListsWrapper = async ({ params, searchParams }: PageProps) => {
	const [user, sParams] = await Promise.all([
		getSessionUser(),
		normalizeSearchParamToString(searchParams),
	]);

	const userId = user.id;
	const { q, prefix } = sParams;

	return (
		<ItemsProvider items={fetchLists(userId, { q, prefix })}>
			<InitialsProvider initials={fetchListsInitials(userId)}>
				<Lists />
			</InitialsProvider>
		</ItemsProvider>
	);
};

export default Page;
