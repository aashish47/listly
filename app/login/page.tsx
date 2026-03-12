import AuthUi from "@/components/AuthUi";

const Home = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-neutral-900">
			<div className="flex w-full max-w-screen-md flex-col gap-2 p-2">
				<h1 className="text-center text-neutral-200 capitalize">sign in</h1>
				<AuthUi />
			</div>
		</div>
	);
};

export default Home;
