import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className="flex flex-col gap-2">
			{[...Array(7)].map((_, index) => (
				<Skeleton className="h-10 w-full" key={index} />
			))}
		</div>
	);
};

export default Loading;
