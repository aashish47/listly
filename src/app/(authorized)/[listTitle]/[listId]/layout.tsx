import { fetchListById } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";

import React from "react";

export async function generateMetadata({
	params,
}: PageProps<"/[listTitle]/[listId]">) {
	const { listId } = await params;
	const user = await getSessionUser();
	const { title } = await fetchListById(user.id, listId);
	return {
		title,
	};
}

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
