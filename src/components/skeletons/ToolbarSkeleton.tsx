import RectangleSkeleton from "@/components/skeletons/RectangleSkeleton";
import { TOOLBAR_HEIGHT } from "@/constants/dimensions";

const ToolbarSkeleton = () => {
	return <RectangleSkeleton size={1} height={TOOLBAR_HEIGHT} />;
};

export default ToolbarSkeleton;
