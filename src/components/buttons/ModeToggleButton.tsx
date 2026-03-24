"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";

export function ModeToggleButton() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<AnimatePresence mode="wait" initial={false}>
						{theme === "light" ? (
							<motion.div
								key="sun"
								initial={{ scale: 0, rotate: -90 }}
								animate={{ scale: 1, rotate: 0 }}
								exit={{ scale: 0, rotate: 90 }}
								transition={{ duration: 0.2 }}
							>
								<Sun className="h-[1.2rem] w-[1.2rem]" />
							</motion.div>
						) : (
							<motion.div
								key="moon"
								initial={{ scale: 0, rotate: 90 }}
								animate={{ scale: 1, rotate: 0 }}
								exit={{ scale: 0, rotate: -90 }}
								transition={{ duration: 0.2 }}
							>
								<Moon className="h-[1.2rem] w-[1.2rem]" />
							</motion.div>
						)}
					</AnimatePresence>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
