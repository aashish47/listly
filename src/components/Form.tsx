"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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
			<Input required placeholder="vocabulary..." type="text" name="title" />
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
