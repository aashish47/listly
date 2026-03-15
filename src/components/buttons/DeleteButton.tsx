"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
	title: string;
	deleteAction: any;
}

export default function DeleteButton({
	title,
	deleteAction,
}: DeleteButtonProps) {
	const [isPending, startTransition] = useTransition();

	const handleAction = () => {
		startTransition(async () => {
			const result = await deleteAction();
			const toastType = result.success ? "success" : "error";
			toast[toastType](result.message, {
				description: format(result.date, "PPPPpp"),
			});
		});
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="destructive"
					size={isPending ? "default" : "icon"}
					disabled={isPending}
				>
					{isPending ? (
						<>
							<Spinner data-icon="inline-start" />
							Deleting...
						</>
					) : (
						<Trash2Icon />
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle className="line-clamp-1 break-all">
						Delete {title}?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action is permanent and cannot be undone. All data associated
						with this item will be removed.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
					<form action={handleAction}>
						<AlertDialogAction
							className="w-full"
							type="submit"
							variant="destructive"
						>
							Delete
						</AlertDialogAction>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
