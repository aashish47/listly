import { EmptyList } from "@/components/EmptyList";
import FallbackList from "@/components/FallbackList";
import ListItems from "@/components/ListItems";
import { fetchListItemsByAlpha } from "@/lib/data/list-item-queries";
import { prisma } from "@/lib/prisma";
import alphabets from "@/utils/alphabets";
import { Suspense } from "react";

export async function generateStaticParams() {
	const lists = await prisma.list.findMany({
		select: { id: true },
	});

	return lists.flatMap((list) => {
		return alphabets.map((alpha) => ({
			listId: list.id,
			alpha,
		}));
	});
}

const Home = async ({
	params,
}: {
	params: Promise<{ listId: string; alpha: string }>;
}) => {
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
		alpha: string;
	}>;
}) => {
	const { listId, alpha } = await params;
	const listItems = await fetchListItemsByAlpha(listId, alpha);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<EmptyList type="alpha" />
	);
};

export default Home;
