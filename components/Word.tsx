import { DeleteButton, EditButton } from "@/components/buttons/wordActions";
import { Vocabulary } from "@/generated/prisma/client";

const Word = ({ id, word }: Vocabulary) => {
	return (
		<div className="bar-cyan mb-3 flex justify-between">
			{word}
			<div className="flex gap-4">
				<EditButton id={id} word={word} />
				<DeleteButton id={id} word={word} />
			</div>
		</div>
	);
};

export default Word;
