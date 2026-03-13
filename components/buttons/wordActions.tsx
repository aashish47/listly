"use client";
import ModalButton from "@/components/buttons/ModalButton";
import Confirm from "@/components/Confirm";
import Form from "@/components/Form";
import { deleteWord, updateWord } from "@/lib/actions";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

export const EditButton = ({ id, word }: { id: number; word: string }) => {
	const [open, setOpen] = useState(false);
	const updateWordWithId = updateWord.bind(null, id);
	return (
		<ModalButton
			buttonContent={<Pencil />}
			open={open}
			setOpen={setOpen}
			modalContent={
				<>
					<h2 className="text-center text-slate-100 capitalize">update</h2>
					<div className="h-4" />
					<Form
						action={updateWordWithId}
						buttonType="update"
						inputDefault={word}
						color="btn-teal"
					/>
					<button
						className="btn-white mt-3 w-full"
						onClick={() => setOpen(false)}
					>
						cancel
					</button>
				</>
			}
		/>
	);
};

export const DeleteButton = ({ id, word }: { id: number; word: String }) => {
	const [open, setOpen] = useState(false);
	const deleteWordWithId = deleteWord.bind(null, id);
	return (
		<ModalButton
			buttonContent={<Trash />}
			open={open}
			setOpen={setOpen}
			modalContent={
				<Confirm
					type={"delete"}
					description={`Are you sure you want to delete ${word}? This action cannot be undone.`}
					action={deleteWordWithId}
					setOpen={setOpen}
				/>
			}
		/>
	);
};
