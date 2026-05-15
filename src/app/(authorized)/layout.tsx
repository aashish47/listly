import Navbar from "@/components/nav/Navbar";
import AuthProvider from "@/contexts/auth-provider";
import { getSessionUser } from "@/lib/supabase/auth-utils";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userPromise = getSessionUser();
	return (
		<AuthProvider user={userPromise}>
			<div className="flex w-full max-w-3xl flex-col gap-3 p-2">
				<Navbar />
				{children}
			</div>
		</AuthProvider>
	);
}
