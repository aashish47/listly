import HomeButton from "@/components/buttons/HomeButton";
import LogoutButton from "@/components/buttons/LogoutButton";

const Navbar = () => {
	return (
		<div className="flex justify-between">
			<HomeButton />
			<LogoutButton />
		</div>
	);
};

export default Navbar;
