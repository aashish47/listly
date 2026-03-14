import { AlphabetButton } from "@/components/buttons/AlphabetButton";
import alphabets from "@/utils/alphabets";

const Alphabets = () => {
	return (
		<div className="flex flex-wrap justify-center gap-3">
			{alphabets.map((alpha) => (
				<AlphabetButton key={alpha} alpha={alpha} />
			))}
		</div>
	);
};

export default Alphabets;
