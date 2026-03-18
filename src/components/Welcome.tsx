import { HEADER_HEIGHT } from "@/constants/dimensions";
import { getSessionUser } from "@/lib/supabase/auth-utils";

const Welcome = async () => {
	const { user_metadata, email } = await getSessionUser();
	return (
		<div className={`h-${HEADER_HEIGHT} content-center self-center`}>
			Welcome, {user_metadata.display_name ?? user_metadata.full_name ?? email}
		</div>
	);
};

export default Welcome;
