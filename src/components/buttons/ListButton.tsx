import { Button } from "@/components/ui/button";
import { fetchListById } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { ListParamsPromise } from "@/types/params";
import Link from "next/link";

interface ListButtonProps {
	params: ListParamsPromise;
}

const ListButton = async ({ params }: ListButtonProps) => {
	const { listId } = await params;
	const user = await getSessionUser();
	const { title } = await fetchListById(user.id, listId);
	return (
		<Button asChild variant="secondary" className="h-12">
			<Link href={`/${listId}`}>{title}</Link>
		</Button>
	);
};

export default ListButton;
