import FallbackSkeleton from "@/components/FallbackSkeleton";
import Form from "@/components/Form";
import { EmptyList } from "@/components/items/EmptyList";
import Lists from "@/components/items/Lists";
import Welcome from "@/components/Welcome";
import {
	HEADER_HEIGHT,
	ICON_HEIGHT,
	ITEM_HEIGHT,
	TEXTAREA_HEIGHT,
} from "@/constants/dimensions";
import { addList } from "@/lib/actions/list-actions";
import { fetchLists } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { Suspense } from "react";

const Page = async () => {
	return (
		<>
			<Suspense fallback={<FallbackSkeleton size={1} height={HEADER_HEIGHT} />}>
				<Welcome />
			</Suspense>
			<Suspense
				fallback={
					<div className="flex flex-col gap-2">
						<FallbackSkeleton size={1} height={TEXTAREA_HEIGHT} />
						<FallbackSkeleton size={1} height={ICON_HEIGHT} />
					</div>
				}
			>
				<Form action={addList} buttonName="create" />
			</Suspense>
			<Suspense fallback={<FallbackSkeleton size={4} height={ITEM_HEIGHT} />}>
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
