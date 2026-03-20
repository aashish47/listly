import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import Link from "next/link";

interface ListButtonProps {
	listId: string;
	title: string;
}

const ListButton = async ({ listId, title }: ListButtonProps) => {
	return (
		<Button asChild variant="secondary" className="h-12">
			<Link href={`/${slugify(title)}/${listId}`}>{title}</Link>
		</Button>
	);
};

export default ListButton;
