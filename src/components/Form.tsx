"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ActionPromise } from "@/types/actions";
import { format } from "date-fns";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

interface FormProps {
	action: (formData: FormData) => ActionPromise;
	buttonName: "create" | "add";
}

const listPlaceholders = [
	"World Domination Plans",
	"Things I'll Probably Forget",
	"Midnight Epiphanies",
	"Top Secret Intel",
	"The 'Maybe Someday' List",
	"Grocery Shenanigans",
	"Master Quest Log",
	"Brain Dump #42",
];

const itemPlaceholders = [
	"Buy a tiny hat for the cat",
	"Plot world domination (slowly)",
	"Remember where I hid the snacks",
	"Become a sourdough wizard",
	"Manifesting a pizza right now",
	"Don't forget the 'emergency' chocolate",
	"Investigate that weird noise",
	"Find the matching sock",
	"Finally finish that one thing...",
	"Draft a letter to my future self",
];

const Form: React.FC<FormProps> = ({ action, buttonName }) => {
	const [isPending, startTransition] = useTransition();

	const [text, setText] = useState(
		buttonName === "create" ? "New List Name..." : "Add something...",
	);

	const handleAction = (formData: FormData) => {
		startTransition(async () => {
			const result = await action(formData);

			const source =
				buttonName === "create" ? listPlaceholders : itemPlaceholders;
			const random = source[Math.floor(Math.random() * source.length)];

			setText(random);

			const toastType = result.success ? "success" : "error";
			toast[toastType](result.message, {
				description: format(result.date, "PPPPpp"),
			});
		});
	};

	return (
		<form action={handleAction} className="flex flex-col gap-2">
			<Input required placeholder={text} type="text" name="title" />
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
