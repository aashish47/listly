import { EmptyList } from "@/components/EmptyList";
import FallbackList from "@/components/FallbackList";
import ListItems from "@/components/ListItems";
import { fetchListItems } from "@/lib/data/list-item-queries";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ listId: string }> }) => {
	return (
		<Suspense fallback={<FallbackList size={4} height={12} />}>
			<ListItemsWrapper params={params} />
		</Suspense>
	);
};

const ListItemsWrapper = async ({
	params,
}: {
	params: Promise<{
		listId: string;
	}>;
}) => {
	const { listId } = await params;
	const listItems = await fetchListItems(listId);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<EmptyList type="items" />
	);
};

export default Page;
