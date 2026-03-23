"use client";

import React, { createContext, use } from "react";

export const InitialsContext = createContext<Promise<string[]> | null>(null);
const InitialsProvider = ({
	children,
	initials,
}: {
	children: React.ReactNode;
	initials: Promise<string[]>;
}) => {
	return <InitialsContext value={initials}>{children}</InitialsContext>;
};

export default InitialsProvider;

export const useInitials = () => {
	const promise = use(InitialsContext);
	if (!promise) {
		throw new Error("useInitials must be used within an InitialsProvider");
	}
	return use(promise);
};
