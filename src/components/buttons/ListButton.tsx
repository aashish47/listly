import { Button } from "@/components/ui/button";
import { ListParamsPromise } from "@/types/params";
import Link from "next/link";

interface ListButtonProps {
	params: ListParamsPromise;
}

const ListButton = async ({ params }: ListButtonProps) => {
	const { listTitle, listId } = await params;

	return (
		<Button asChild variant="secondary" className="h-12">
			<Link href={`/${listTitle}/${listId}`}>
				{decodeURIComponent(listTitle)}
			</Link>
		</Button>
	);
};

export default ListButton;
