"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { toast } from "sonner";

interface UpdateButtonProps {
	title: string;
	updateAction: any;
}

const UpdateButton = ({ title, updateAction }: UpdateButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);
	const formId = useId();

	const handleAction = (formData: FormData) => {
		startTransition(async () => {
			const result = await updateAction(formData);
			if (result.success) {
				setOpen(false);
			}
			const toastType = result.success ? "success" : "error";
			toast[toastType](result.message, {
				description: format(result.date, "PPPPpp"),
			});
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<form action={handleAction} id={formId} />
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<PencilIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Edit</DialogTitle>
					<DialogDescription>
						Make changes to your list here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<FieldGroup>
					<Field>
						<Label htmlFor="title-1">Title</Label>
						<Input
							form={formId}
							id="title-1"
							name="title"
							defaultValue={title}
						/>
					</Field>
				</FieldGroup>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button form={formId} type="submit" disabled={isPending}>
						{isPending ? (
							<>
								<Spinner data-icon="inline-start" />
								Updating...
							</>
						) : (
							<>Save changes</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateButton;
