import TableSkeleton from "@/components/skeletons/TableSkeleton";
import DataTableWrapper from "@/components/table/DataTableWrapper";
import { ICON_HEIGHT } from "@/constants/dimensions";
import { Suspense } from "react";

const Page = async (props: PageProps<"/">) => {
	return (
		<>
			<div className="shrink-0" style={{ height: `${ICON_HEIGHT}px` }} />
			<Suspense fallback={<TableSkeleton />}>
				<DataTableWrapper {...props} />
			</Suspense>
		</>
	);
};

export default Page;
