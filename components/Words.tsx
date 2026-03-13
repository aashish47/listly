import Word from "@/components/Word";
import { Vocabulary } from "@/generated/prisma/client";

const Words = ({ vocabulary }: { vocabulary: Vocabulary[] }) => {
	return (
		vocabulary && (
			<ul className="flex flex-col gap-3">
				{vocabulary.map((vocab) => (
					<li key={vocab.id}>
						<Word {...vocab} />
					</li>
				))}
			</ul>
		)
	);
};

export default Words;
