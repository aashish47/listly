import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const HomeButton = () => {
	return (
		<Button variant="outline" asChild size="icon">
			<Link href="/">
				<Home />
				<span className="sr-only">Go to Home</span>
			</Link>
		</Button>
	);
};

export default HomeButton;
