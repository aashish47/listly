"use client";
import FormButton, { FormButtonName } from "@/components/buttons/FormButton";
import { Textarea } from "@/components/ui/textarea";
import { ActionPromise } from "@/types/actions";
import { format } from "date-fns";
import { toast } from "sonner";

interface FormProps {
	action: (formData: FormData) => ActionPromise;
	buttonName: Extract<FormButtonName, "add" | "create">;
}

const Form: React.FC<FormProps> = ({ action, buttonName }) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
		}
	};

	const handleAction = async (formData: FormData) => {
		const result = await action(formData);
		const toastType = result.success ? "success" : "error";
		toast[toastType](result.message, {
			description: format(result.date, "PPPPpp"),
		});
	};

	return (
		<form action={handleAction} className="flex flex-col gap-2">
			<Textarea
				placeholder="Press Cmd+Enter to save"
				name="titles"
				onKeyDown={handleKeyDown}
			/>
			<FormButton formAction={handleAction} buttonName={buttonName} />
		</form>
	);
};

export default Form;
