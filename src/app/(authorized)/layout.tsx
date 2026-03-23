import AuthProvider from "@/components/contexts/auth-provider";
import Navbar from "@/components/nav/Navbar";
import { getSessionUser } from "@/lib/supabase/auth-utils";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userPromise = getSessionUser();
	return (
		<AuthProvider user={userPromise}>
			<Navbar />
			{children}
		</AuthProvider>
	);
}
