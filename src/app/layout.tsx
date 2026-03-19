import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | Listly",
		default: "Listly",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			suppressHydrationWarning
			lang="en"
			className={cn("font-sans", geist.variable)}
		>
			<head />
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex h-screen justify-center">
						<div className="flex w-full max-w-3xl flex-col gap-6 p-2">
							{children}
						</div>
					</div>
					<Toaster richColors closeButton />
				</ThemeProvider>
			</body>
		</html>
	);
}
