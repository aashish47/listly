import HomeButton from "@/components/buttons/HomeButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import { ModeToggleButton } from "@/components/buttons/ModeToggleButton";
import IconSkeleton from "@/components/skeletons/IconSkeleton";
import Welcome from "@/components/Welcome";
import { Suspense } from "react";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<HomeButton />
				<ModeToggleButton />
			</div>
			<Suspense fallback={<IconSkeleton />}>
				<Welcome />
			</Suspense>
			<LogoutButton />
		</div>
	);
};

export default Navbar;
