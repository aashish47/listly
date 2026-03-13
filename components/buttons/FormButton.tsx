"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const FormButton = ({
	type,
	color,
}: {
	type: string;
	color: string;
}) => {
	const { pending } = useFormStatus();

	return pending ? (
		<LoadingButton type={type} />
	) : (
		<Button variant={"outline"} className="w-full capitalize">
			{type}
		</Button>
		// <button className={`w-full ${color}`}>{type}</button>
	);
};
