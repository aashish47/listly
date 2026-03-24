import ItemSkeleton from "@/components/skeletons/ItemSkeleton";
import ToolbarSkeleton from "@/components/skeletons/ToolbarSkeleton";

const TableSkeleton = () => {
	return (
		<div className="flex flex-col gap-2">
			<ToolbarSkeleton />
			<ItemSkeleton />
		</div>
	);
};

export default TableSkeleton;
