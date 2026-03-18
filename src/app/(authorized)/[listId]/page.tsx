import FallbackSkeleton from "@/components/FallbackSkeleton";
import { EmptyList } from "@/components/items/EmptyList";
import ListItems from "@/components/items/ListItems";
import { ITEM_HEIGHT } from "@/constants/dimensions";
import { fetchListItems } from "@/lib/data/list-item-queries";
import { ListParamsPromise } from "@/types/params";
import { Suspense } from "react";

const Page = async ({ params }: { params: ListParamsPromise }) => {
	return (
		<Suspense fallback={<FallbackSkeleton size={3} height={ITEM_HEIGHT} />}>
			<ListItemsWrapper params={params} />
		</Suspense>
	);
};

const ListItemsWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const { listId } = await params;
	const listItems = await fetchListItems(listId);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<EmptyList type="items" />
	);
};

export default Page;
