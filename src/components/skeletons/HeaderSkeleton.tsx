import RectangleSkeleton from "@/components/skeletons/RectangleSkeleton";
import { HEADER_HEIGHT } from "@/constants/dimensions";

const HeaderSkeleton = () => {
	return <RectangleSkeleton size={1} height={HEADER_HEIGHT} />;
};

export default HeaderSkeleton;
