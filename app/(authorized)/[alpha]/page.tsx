import NoWord from "@/components/NoWord";
import Words from "@/components/Words";
import { fetchVocabularyByAlpha } from "@/lib/actions";
import alphabets from "@/utils/alphabets";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	return alphabets.map((alpha) => ({
		alpha,
	}));
}

const Home = async ({ params }: { params: { alpha: string } }) => {
	const alpha = (await params).alpha;
	const regex = /^[a-zA-Z]$/;
	if (!regex.test(alpha)) {
		notFound();
	}
	const vocabulary = await fetchVocabularyByAlpha(alpha);

	return vocabulary.length > 0 ? <Words vocabulary={vocabulary} /> : <NoWord />;
};

export default Home;
