import { fetchListById } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";
import { PageProps } from "@/types/params";

import React from "react";

export async function generateMetadata({ params, searchParams }: PageProps) {
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
