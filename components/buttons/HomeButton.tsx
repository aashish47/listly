import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const HomeButton = () => {
	return (
		<Link href="/home" prefetch={false} className="btn-gray">
			<HomeIcon className="h-6 w-6" />
		</Link>
	);
};

export default HomeButton;
