import Navbar from "@/components/Navbar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<h1 className="text-center capitalize">vocabulary</h1>
			{children}
		</>
	);
}
