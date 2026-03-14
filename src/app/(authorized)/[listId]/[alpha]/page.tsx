import ListItems from "@/components/ListItems";
import NoWord from "@/components/NoWord";
import { fetchListItemsByAlpha } from "@/lib/data/list-item-queries";
import { prisma } from "@/lib/prisma";
import alphabets from "@/utils/alphabets";
import { notFound } from "next/navigation";

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
	const { listId, alpha } = await params;
	const regex = /^[a-zA-Z]$/;
	if (!regex.test(alpha)) {
		notFound();
	}
	const listItems = await fetchListItemsByAlpha(alpha, listId);

	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<NoWord />
	);
};

export default Home;
