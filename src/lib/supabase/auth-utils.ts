import { createClient } from "@/lib/supabase/server"; // Or your client path
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSessionUser = cache(async () => {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect("/login");
	}

	return user;
});
