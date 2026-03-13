import React from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black">
			<div className="b w-96 rounded p-4 outline">{children}</div>
		</div>
	);
};

export default Modal;
