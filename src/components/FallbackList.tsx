import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FallbackListProps {
	size: number;
	height: number;
}

const FallbackList = ({ size, height }: FallbackListProps) => {
	return (
		<div className="flex flex-col gap-2">
			{[...Array(size)].map((_, index) => (
				<Skeleton className={cn(`h-${height}`, "w-full")} key={index} />
			))}
		</div>
	);
};

export default FallbackList;
