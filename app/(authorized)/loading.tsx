import Skeleton from "@/components/Skeleton";

const Loading = () => {
	return (
		<div className="flex flex-col gap-2">
			{[...Array(7)].map((_, index) => (
				<Skeleton key={index} />
			))}
		</div>
	);
};

export default Loading;
