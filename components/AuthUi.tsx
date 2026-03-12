"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthUi() {
	const supabase = createClient();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			alert(error.message);
		} else {
			// Redirect to your desired internal page (e.g., /dashboard)
			router.push("/home");
			router.refresh();
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Login</button>
		</form>
	);
}
