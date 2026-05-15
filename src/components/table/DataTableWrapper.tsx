import DataTable from "@/components/table/DataTable";
import InitialsProvider from "@/contexts/initials-provider";
import ItemProvider from "@/contexts/item-provider";
import ItemsProvider from "@/contexts/items-provider";
import { SelectableItem } from "@/hooks/useListSelection";
import {
	fetchListItems,
	fetchListItemsInitials,
} from "@/lib/data/list-item-queries";
import {
	fetchListById,
	fetchLists,
	fetchListsInitials,
} from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { normalizeSearchParamToString } from "@/lib/utils";

const DataTableWrapper = async (
	pageProps: PageProps<"/"> | PageProps<"/[listTitle]/[listId]">,
) => {
	const [user, rParams, sParams] = await Promise.all([
		getSessionUser(),
		pageProps.params,
		normalizeSearchParamToString(pageProps.searchParams),
	]);

	const userId = user.id;
	const { q, prefix } = sParams;

	const isInnerMode = "listId" in rParams && !!rParams.listId;
	const listId = isInnerMode ? rParams.listId : "";

	const mode = isInnerMode
		? {
				item: fetchListById(userId, listId),
				items: fetchListItems(listId, userId, { q, prefix }),
				initials: fetchListItemsInitials(listId, userId),
			}
		: {
				item: Promise.resolve({ id: "", title: "" }),
				items: fetchLists(userId, { q, prefix }),
				initials: fetchListsInitials(userId),
			};

	const { item, items, initials } = mode;

	return (
		<ItemProvider item={item}>
			<ItemsProvider items={items as Promise<SelectableItem[]>}>
				<InitialsProvider initials={initials}>
					<DataTable />
				</InitialsProvider>
			</ItemsProvider>
		</ItemProvider>
	);
};

export default DataTableWrapper;
