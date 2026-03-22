import Form from "@/components/form/Form";
import { EmptyList } from "@/components/items/EmptyList";
import Lists from "@/components/items/Lists";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import Welcome from "@/components/Welcome";
import { addList } from "@/lib/actions/list-actions";
import { fetchLists } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { Suspense } from "react";

const Page = async () => {
	return (
		<>
			<Suspense fallback={<HeaderSkeleton />}>
				<Welcome />
			</Suspense>
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
