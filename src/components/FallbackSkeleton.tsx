import { Skeleton } from "@/components/ui/skeleton";

interface FallbackSkeletonProps {
	size: number;
	height: number;
}

const FallbackSkeleton = ({ size, height }: FallbackSkeletonProps) => {
	return (
		<div className="flex flex-col gap-2">
			{[...Array(size)].map((_, index) => (
				<Skeleton
					className="w-full"
					key={index}
					style={{ height: `${height}px` }}
				/>
			))}
		</div>
	);
};

export default FallbackSkeleton;
