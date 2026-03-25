import ListName from "@/components/items/ListName";
import IconSkeleton from "@/components/skeletons/IconSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import DataTableWrapper from "@/components/table/DataTableWrapper";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { Suspense } from "react";

export async function generateStaticParams() {
	const lists = await prisma.list.findMany({
		select: { id: true, title: true },
	});

	return lists.map(({ id, title }) => {
		return { listId: id, listTitle: slugify(title) };
	});
}

const Page = async (props: PageProps<"/[listTitle]/[listId]">) => {
	return (
		<>
			<Suspense fallback={<IconSkeleton />}>
				<ListName {...props} />
			</Suspense>
			<Suspense fallback={<TableSkeleton />}>
				<DataTableWrapper {...props} />
			</Suspense>
		</>
	);
};

export default Page;
