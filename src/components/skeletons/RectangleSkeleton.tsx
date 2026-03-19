import { Skeleton } from "@/components/ui/skeleton";

interface RectangleSkeletonProps {
	size: number;
	height: number;
}

const RectangleSkeleton = ({ size, height }: RectangleSkeletonProps) => {
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

export default RectangleSkeleton;
