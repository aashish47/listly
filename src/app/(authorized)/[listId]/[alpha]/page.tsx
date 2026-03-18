import FallbackSkeleton from "@/components/FallbackSkeleton";
import { EmptyList } from "@/components/items/EmptyList";
import ListItems from "@/components/items/ListItems";
import alphabets from "@/constants/alphabets";
import { ITEM_HEIGHT } from "@/constants/dimensions";
import { fetchListItemsByAlpha } from "@/lib/data/list-item-queries";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { ListParamsPromise } from "@/types/params";
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

const Page = async ({ params }: { params: ListParamsPromise }) => {
	return (
		<Suspense fallback={<FallbackSkeleton size={4} height={ITEM_HEIGHT} />}>
			<ListItemsWrapper params={params} />
		</Suspense>
	);
};

const ListItemsWrapper = async ({ params }: { params: ListParamsPromise }) => {
	const { listId, alpha = "" } = await params;
	const charCode = alpha.toLowerCase().charCodeAt(0);
	const isLetter = alpha.length === 1 && charCode >= 97 && charCode <= 122;
	if (!isLetter) {
		notFound();
	}
	const { id } = await getSessionUser();

	const listItems = await fetchListItemsByAlpha(listId, alpha, id);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<EmptyList type="alpha" />
	);
};

export default Page;
