"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface FormProps {
	action: any;
	inputDefault: string;
	buttonType: string;
	color: string;
}

const initalState = {
	message: "",
	date: null,
};

const Form: React.FC<FormProps> = ({
	action,
	inputDefault,
	buttonType,
	color,
}) => {
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
			<Input
				required
				defaultValue={inputDefault}
				placeholder="Word..."
				type="text"
				name="word"
			/>
			<Button
				variant="secondary"
				type="submit"
				// size={isPending ? "default" : "icon"}
				className="w-full"
				disabled={isPending}
			>
				{isPending ? (
					<>
						<Spinner data-icon="inline-start" />
						Adding...
					</>
				) : (
					<>Add</>
				)}
			</Button>
		</form>
	);
};

export default Form;
