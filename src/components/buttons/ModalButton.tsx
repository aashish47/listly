import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";

interface ModalButtonProps {
	buttonContent: any;
	buttonClass?: string;
	modalContent: any;
	open: boolean;
	setOpen: any;
}

const ModalButton: React.FC<ModalButtonProps> = ({
	buttonClass,
	buttonContent,
	modalContent,
	open,
	setOpen,
}) => {
	return (
		<>
			<Button
				variant="outline"
				className="capitalize"
				onClick={(e) => {
					setOpen(true);
				}}
			>
				{buttonContent}
			</Button>
			{open && <Modal>{modalContent}</Modal>}
		</>
	);
};

export default ModalButton;
