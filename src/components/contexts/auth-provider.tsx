"use client";

import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, use } from "react";

export const AuthContext = createContext<Promise<User> | null>(null);

const AuthProvider = ({
	children,
	user,
}: {
	children: ReactNode;
	user: Promise<User>;
}) => {
	return <AuthContext value={user}>{children}</AuthContext>;
};

export default AuthProvider;

export const useAuth = () => {
	const promise = use(AuthContext);
	if (!promise) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return use(promise);
};
