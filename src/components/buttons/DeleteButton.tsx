import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";

const DeleteButton = () => {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon">
						<TrashIcon />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default DeleteButton;
