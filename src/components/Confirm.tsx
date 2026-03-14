import { FormButton } from "@/components/buttons/FormButton";
import { Dispatch, SetStateAction } from "react";

interface ConfirmProps {
	type: string;
	description: string;
	action: any;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const Confirm: React.FC<ConfirmProps> = ({
	type,
	description,
	action,
	setOpen,
}) => {
	return (
		<div className="text-slate-300">
			<h3 className="font-medium capitalize">{type}?</h3>
			<h4 className="normal-case">{description}</h4>
			<div className="mt-4 flex flex-col items-stretch gap-3">
				<form action={action}>
					<FormButton color="btn-rose" type={type} />
				</form>
				<button className="btn-white" onClick={() => setOpen(false)}>
					cancel
				</button>
			</div>
		</div>
	);
};

export default Confirm;
