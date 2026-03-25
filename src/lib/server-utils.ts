"use server";

import { getSessionUser } from "@/lib/supabase/auth-utils";
import { actionResponse } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

export async function safeAction(
	actionName: string,
	handler: (user: User) => Promise<string | void>,
) {
	try {
		const user = await getSessionUser();
		const result = await handler(user);
		return actionResponse(
			true,
			typeof result === "string" ? result : "Success",
		);
	} catch (err: unknown) {
		console.error(`${actionName.toUpperCase()}_ERROR:`, err);
		const message = err instanceof Error ? err.message : "Something went wrong";
		return actionResponse(false, message);
	}
}
