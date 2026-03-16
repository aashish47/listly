import Form from "@/components/Form";
import Lists from "@/components/Lists";
import NoWord from "@/components/NoWord";
import { addList } from "@/lib/actions/list-actions";
import { fetchLists } from "@/lib/data/list-queries";
import { getSessionUser } from "@/lib/supabase/auth-utils";

const Page = async () => {
	const user = await getSessionUser();
	const lists = await fetchLists(user);
	return (
		<>
			<Form
				action={addList}
				buttonType="add"
				inputDefault=""
				color="btn-teal"
			/>

			{lists.length > 0 ? <Lists lists={lists} /> : <NoWord />}
		</>
	);
};

export default Page;
