import Navbar from "@/components/nav/Navbar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
