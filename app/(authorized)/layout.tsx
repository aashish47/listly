import Alphabets from "@/components/Alphabets";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import { addWord } from "@/lib/actions";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen justify-center">
			<div className="flex max-w-screen-md flex-col gap-6 p-2">
				<Navbar />
				<h1 className="text-center capitalize">vocabulary</h1>
				<Form
					action={addWord}
					buttonType="add"
					inputDefault=""
					color="btn-teal"
				/>
				<Alphabets />
				{children}
			</div>
		</div>
	);
}
