"use client";
import { FormButton } from "@/components/buttons/FormButton";
import Input from "@/components/Input";
import Snackbar from "@/components/Snackbar";
import React, { useActionState } from "react";

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
	const [state, formAction] = useActionState(action, initalState);

	return (
		<>
			<form action={formAction} className="flex flex-col gap-2">
				<Input defaultValue={inputDefault} />
				<FormButton type={buttonType} color={color} />
				{state.message && <Snackbar state={state} />}
			</form>
		</>
	);
};

export default Form;
