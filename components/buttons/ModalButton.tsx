import Modal from "@/components/Modal";

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
			<button className={buttonClass} onClick={() => setOpen(true)}>
				{buttonContent}
			</button>
			{open && <Modal>{modalContent}</Modal>}
		</>
	);
};

export default ModalButton;
