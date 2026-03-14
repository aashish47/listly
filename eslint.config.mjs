import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	// 1. Ignore build outputs
	{
		ignores: [".next/**", "dist/**", "out/**"],
	},

	// 2. Core configuration for TS/JS files
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		plugins: {
			"@next/next": nextPlugin,
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			// Direct access to Next.js 16 recommended rules
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,

			// Add custom overrides here
			"@next/next/no-img-element": "error",
		},
	},
]);
