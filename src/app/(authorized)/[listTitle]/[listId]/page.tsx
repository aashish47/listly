import { EmptyList } from "@/components/items/EmptyList";
import ListItems from "@/components/items/ListItems";
import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import { fetchListItems } from "@/lib/data/list-item-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { ListParamsPromise } from "@/types/params";
import { Suspense } from "react";

const Page = async ({ params }: { params: ListParamsPromise }) => {
	return (
		<Suspense fallback={<ItemSkeleton />}>
			<ListItemsWrapper params={params} />
		</Suspense>
	);
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
