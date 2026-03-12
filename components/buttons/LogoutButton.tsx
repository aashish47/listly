"use client";
import ModalButton from "@/components/buttons/ModalButton";
import Confirm from "@/components/Confirm";
import { logout } from "@/lib/actions";
import { useState } from "react";

const LogoutButton = () => {
	const [open, setOpen] = useState(false);
	return (
		<ModalButton
			buttonContent="logout"
			buttonClass="btn-gray"
			open={open}
			setOpen={setOpen}
			modalContent={
				<Confirm
					type="logout"
					description="You can always log back in at any time."
					action={logout}
					setOpen={setOpen}
				/>
			}
		/>
	);
};

export default LogoutButton;
