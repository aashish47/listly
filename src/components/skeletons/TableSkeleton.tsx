import RectangleSkeleton from "@/components/skeletons/RectangleSkeleton";
import { ITEM_HEIGHT, TOOLBAR_HEIGHT } from "@/constants/dimensions";

const TableSkeleton = () => {
	return (
		<div className="flex flex-col gap-2">
			<RectangleSkeleton size={1} height={TOOLBAR_HEIGHT} />
			<RectangleSkeleton size={4} height={ITEM_HEIGHT} />
		</div>
	);
};

export default TableSkeleton;
