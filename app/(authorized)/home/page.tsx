import NoWord from "@/components/NoWord";
import Words from "@/components/Words";
import { fetchVocabulary } from "@/lib/actions";

const Home = async () => {
	const vocabulary = await fetchVocabulary();
	return vocabulary.length > 0 ? <Words vocabulary={vocabulary} /> : <NoWord />;
};

export default Home;
