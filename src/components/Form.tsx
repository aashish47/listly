"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ActionPromise } from "@/types/actions";
import { format } from "date-fns";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface FormProps {
	action: (formData: FormData) => ActionPromise;
	buttonName: "create" | "add";
}

const Form: React.FC<FormProps> = ({ action, buttonName }) => {
	const [isPending, startTransition] = useTransition();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
		}
	};

	const handleAction = (formData: FormData) => {
		startTransition(async () => {
			const result = await action(formData);
			const toastType = result.success ? "success" : "error";
			toast[toastType](result.message, {
				description: format(result.date, "PPPPpp"),
			});
		});
	};

	return (
		<form action={handleAction} className="flex flex-col gap-2">
			<Textarea
				placeholder="Press Cmd+Enter to save"
				name="titles"
				onKeyDown={handleKeyDown}
			/>
			<Button type="submit" className="w-full" disabled={isPending}>
				{isPending ? (
					<>
						<Spinner data-icon="inline-start" />
						<span className="capitalize">
							{buttonName === "add" ? "adding..." : "creating..."}
						</span>
					</>
				) : (
					<span className="capitalize">{buttonName}</span>
				)}
			</Button>
		</form>
	);
};

export default Form;
