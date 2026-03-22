import Form from "@/components/form/Form";
import { EmptyList } from "@/components/items/EmptyList";
import Lists from "@/components/items/Lists";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import { ICON_HEIGHT } from "@/constants/dimensions";
import { addList } from "@/lib/actions/list-actions";
import { fetchLists } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { Suspense } from "react";

const Page = async () => {
	return (
		<>
			<div
				className="shrink-0 content-center text-center"
				style={{ height: `${ICON_HEIGHT}px` }}
			>
				{""}
			</div>
			<Suspense fallback={<FormSkeleton />}>
				<Form action={addList} buttonName="create" />
			</Suspense>
			<Suspense fallback={<ItemSkeleton />}>
				<ListsWrapper />
			</Suspense>
		</>
	);
};

const ListsWrapper = async () => {
	const { id } = await getSessionUser();
	const lists = await fetchLists(id);

	return lists.length > 0 ? (
		<Lists lists={lists} />
	) : (
		<EmptyList type="lists" />
	);
};

export default Page;
