import ListItems from "@/components/ListItems";
import NoWord from "@/components/NoWord";
import { fetchListItems } from "@/lib/data/list-item-queries";

const Page = async ({ params }: { params: Promise<{ listId: string }> }) => {
	const { listId } = await params;
	const listItems = await fetchListItems(listId);
	return listItems.length > 0 ? (
		<ListItems listItems={listItems} />
	) : (
		<NoWord />
	);
};

export default Page;
