import RectangleSkeleton from "@/components/skeletons/RectangleSkeleton";
import { ICON_HEIGHT, TEXTAREA_HEIGHT } from "@/constants/dimensions";

const FormSkeleton = () => {
	return (
		<div className="flex flex-col gap-2">
			<RectangleSkeleton size={1} height={TEXTAREA_HEIGHT} />
			<RectangleSkeleton size={1} height={ICON_HEIGHT} />
		</div>
	);
};

export default FormSkeleton;
