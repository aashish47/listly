import React from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="bg-opacity-75 fixed inset-0 flex items-center justify-center bg-slate-800">
			<div className="w-96 rounded bg-slate-900 p-4 ring-2 ring-slate-700">
				{children}
			</div>
		</div>
	);
};

export default Modal;
