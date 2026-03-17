import { EmptyList } from "@/components/EmptyList";
import FallbackList from "@/components/FallbackList";
import ListItems from "@/components/ListItems";
import alphabets from "@/constants/alphabets";
import { fetchListItemsByAlpha } from "@/lib/data/list-item-queries";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
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

const Page = async ({
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

	const charCode = alpha.toLowerCase().charCodeAt(0);
	const isLetter = alpha.length === 1 && charCode >= 97 && charCode <= 122;
	if (!isLetter) {
		notFound();
	}

	const listItems = await fetchListItemsByAlpha(listId, alpha);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<EmptyList type="alpha" />
	);
};

export default Page;
