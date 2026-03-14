// "use client";
// import ModalButton from "@/components/buttons/ModalButton";
// import Confirm from "@/components/Confirm";
// import Form from "@/components/Form";
// import { Pencil, Trash } from "lucide-react";
// import { useState } from "react";

// export const EditButton = ({
// 	id,
// 	title,
// 	action,
// }: {
// 	id: string;
// 	title: string;
// 	action: any;
// }) => {
// 	const [open, setOpen] = useState(false);
// 	const updateWordWithId = action.bind(null, id);
// 	return (
// 		<ModalButton
// 			buttonContent={<Pencil />}
// 			open={open}
// 			setOpen={setOpen}
// 			modalContent={
// 				<>
// 					<h2 className="text-center text-slate-100 capitalize">update</h2>
// 					<div className="h-4" />
// 					<Form
// 						action={updateWordWithId}
// 						buttonType="update"
// 						inputDefault={title}
// 						color="btn-teal"
// 					/>
// 					<button
// 						className="btn-white mt-3 w-full"
// 						onClick={() => setOpen(false)}
// 					>
// 						cancel
// 					</button>
// 				</>
// 			}
// 		/>
// 	);
// };

// export const DeleteButton = ({
// 	id,
// 	title,
// 	action,
// }: {
// 	id: string;
// 	title: String;
// 	action: any;
// }) => {
// 	const [open, setOpen] = useState(false);
// 	const deleteWordWithId = action.bind(null, id);
// 	return (
// 		<ModalButton
// 			buttonContent={<Trash />}
// 			open={open}
// 			setOpen={setOpen}
// 			modalContent={
// 				<Confirm
// 					type={"delete"}
// 					description={`Are you sure you want to delete ${title}? This action cannot be undone.`}
// 					action={deleteWordWithId}
// 					setOpen={setOpen}
// 				/>
// 			}
// 		/>
// 	);
// };
