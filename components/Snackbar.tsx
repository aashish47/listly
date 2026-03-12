"use client";

import { useEffect, useState } from "react";

const Snackbar = ({
	state,
}: {
	state: { date: Date | null; message: string };
}) => {
	const [showSnackbar, setShowSnackbar] = useState(false);

	useEffect(() => {
		if (state) {
			setShowSnackbar(true);
			const timer = setTimeout(() => {
				setShowSnackbar(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [state]);
	return (
		showSnackbar && (
			<div className="bar-purple absolute top-2 left-1/2 -translate-x-1/2 text-nowrap">
				{state.message}
			</div>
		)
	);
};

export default Snackbar;
