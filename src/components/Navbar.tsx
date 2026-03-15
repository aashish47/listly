import HomeButton from "@/components/buttons/HomeButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<HomeButton />
				<ModeToggle />
			</div>
			<LogoutButton />
		</div>
	);
};

export default Navbar;
