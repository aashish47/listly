import RectangleSkeleton from "@/components/skeletons/RectangleSkeleton";
import { ITEM_HEIGHT } from "@/constants/dimensions";

const ItemSkeleton = () => {
	return <RectangleSkeleton size={3} height={ITEM_HEIGHT} />;
};

export default ItemSkeleton;
