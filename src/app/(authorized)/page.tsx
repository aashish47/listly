import { EmptyList } from "@/components/EmptyList";
import FallbackList from "@/components/FallbackList";
import Form from "@/components/Form";
import Lists from "@/components/Lists";
import { addList } from "@/lib/actions/list-actions";
import { fetchLists } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { Suspense } from "react";

const Page = async () => {
	return (
		<>
			<Suspense fallback={<FallbackList size={1} height={6} />}>
				<Welcome />
			</Suspense>
			<Form action={addList} buttonName="create" />
			<Suspense fallback={<FallbackList size={4} height={12} />}>
				<ListsWrapper />
			</Suspense>
		</>
	);
};

const Welcome = async () => {
	const { user_metadata, email } = await getSessionUser();
	return <h1>Welcome, {user_metadata.display_name ?? email}</h1>;
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
