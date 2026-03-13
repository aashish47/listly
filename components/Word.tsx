import { DeleteButton, EditButton } from "@/components/buttons/wordActions";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle,
} from "@/components/ui/item";
import { Vocabulary } from "@/generated/prisma/client";

const Word = ({ id, word }: Vocabulary) => {
	return (
		<Item variant="outline">
			<ItemContent>
				<ItemTitle className="capitalize">{word}</ItemTitle>
			</ItemContent>
			<ItemActions>
				<EditButton id={id} word={word} />
				<DeleteButton id={id} word={word} />
			</ItemActions>
		</Item>
	);
};

export default Word;
