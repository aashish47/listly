import { ICON_HEIGHT } from "@/constants/dimensions";
import { fetchListById } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";

const ListName = async (pageProps: PageProps<"/[listTitle]/[listId]">) => {
	const user = await getSessionUser();
	const { listId } = await pageProps.params;
	const { title } = await fetchListById(user.id, listId);

	return (
		<div
			className="shrink-0 content-center truncate text-center md:text-2xl"
			style={{ height: `${ICON_HEIGHT}px` }}
		>
			{title}
		</div>
	);
};

export default ListName;
