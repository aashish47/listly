import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

import { FileWarningIcon } from "lucide-react";

interface EmptyListProps {
	type: "lists" | "items" | "alpha";
}

const data = {
	lists: {
		title: "No Lists Yet",
		description: "You haven't created any lists",
	},
	items: {
		title: "No Items Yet",
		description: "You haven't added any items in this list",
	},
	alpha: {
		title: "No Items Yet",
		description:
			"You haven't added an item stating with this alphabet in this list",
	},
};

export function EmptyList({ type }: EmptyListProps) {
	const { title, description } = data[type];
	return (
		<Empty className="bg-muted/30">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FileWarningIcon />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
