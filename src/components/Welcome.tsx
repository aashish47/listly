import { getSessionUser } from "@/lib/supabase/auth-utils";

const Welcome = async () => {
	const { user_metadata, email } = await getSessionUser();
	return (
		<div
			className="shrink-0 content-center text-center"
			// style={{ height: `${ICON_HEIGHT}px` }}
		>
			Welcome, {user_metadata.display_name ?? user_metadata.full_name ?? email}
		</div>
	);
};

export default Welcome;
