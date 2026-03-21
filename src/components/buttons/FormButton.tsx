"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";

export type FormButtonName = "login" | "signup" | "add" | "create";

interface FormButtonProps extends ButtonProps {
	buttonName: FormButtonName;
	oAuth?: "google";
}

const pendingButtonName: Record<FormButtonName, string> = {
	add: "adding...",
	create: "creating...",
	login: "logging in...",
	signup: "signing up...",
};

const FormButton = ({ buttonName, oAuth, ...props }: FormButtonProps) => {
	const { action, pending } = useFormStatus();
	const isThisButtonLoading = pending && action === props.formAction;

	return (
		<Button
			className="w-full"
			disabled={pending}
			formAction={props.formAction}
			formNoValidate={props.formNoValidate}
			type="submit"
			variant={props.variant}
		>
			{isThisButtonLoading ? (
				<>
					<Spinner data-icon="inline-start" />
					<span className="capitalize">{pendingButtonName[buttonName]}</span>
				</>
			) : (
				<span className="capitalize">{`${buttonName} ${oAuth ? ` with ${oAuth}` : ""}`}</span>
			)}
		</Button>
	);
};

export default FormButton;
