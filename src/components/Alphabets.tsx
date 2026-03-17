import { AlphabetButton } from "@/components/buttons/AlphabetButton";
import alphabets from "@/constants/alphabets";

const Alphabets = () => {
	return (
		<div className="flex flex-wrap justify-center gap-3">
			{alphabets.map((char) => (
				<AlphabetButton key={char} char={char} />
			))}
		</div>
	);
};

export default Alphabets;
