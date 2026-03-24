"use client";
import FormButton, { FormButtonName } from "@/components/buttons/FormButton";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ActionPromise } from "@/types/actions";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type FormType = Extract<FormButtonName, "add" | "create">;

interface AddButtonProps {
	title?: string;
	formType: FormType;
	addAction: (formData: FormData) => ActionPromise;
}

const description: Record<FormType, string> = {
	add: "Add new items to the list",
	create: "Create new lists",
};

const AddButton = ({ title, formType, addAction }: AddButtonProps) => {
	const [open, setOpen] = useState(false);

	const handleAction = async (formData: FormData) => {
		const result = await addAction(formData);
		const toastType = result.success ? "success" : "error";
		toast[toastType](result.message, {
			description: format(result.date, "PPPPpp"),
		});
		if (toastType === "success") {
			setOpen(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader className="min-w-0">
					<DialogTitle className="truncate">{title || "New"}</DialogTitle>
					<DialogDescription>
						{description[formType]}. Click {formType} when you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<form action={handleAction} className="contents">
					<FieldGroup>
						<Field>
							<Label htmlFor="titles">Titles</Label>
							<Textarea
								placeholder="Press Cmd+Enter to save"
								id="titles"
								name="titles"
								onKeyDown={handleKeyDown}
							/>
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<FormButton formType={formType} formAction={handleAction} />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddButton;
