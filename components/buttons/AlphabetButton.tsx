"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export const AlphabetButton = ({ alpha }: { alpha: string }) => {
	const params = useParams();
	const color = alpha === params.alpha ? "btn-fuchsia" : "btn-purple";
	return (
		<Link href={`/${alpha}`} prefetch={false}>
			<div
				className={`flex h-8 w-8 items-center justify-center p-2 ${color} rounded font-medium capitalize ring-3 hover:transition`}
			>
				{alpha}
			</div>
		</Link>
	);
};
