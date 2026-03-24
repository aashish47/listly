import HomeButton from "@/components/buttons/HomeButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import { ModeToggleButton } from "@/components/buttons/ModeToggleButton";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<HomeButton />
				<ModeToggleButton />
			</div>
			{/* <Suspense fallback={<IconSkeleton />}>
				<Welcome />
			</Suspense> */}
			<LogoutButton />
		</div>
	);
};

export default Navbar;
