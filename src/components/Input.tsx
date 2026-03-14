const Input = ({ defaultValue }: { defaultValue: string }) => {
	return (
		<input
			required
			defaultValue={defaultValue}
			placeholder="Word..."
			type="text"
			name="word"
			className="h-12 w-full rounded bg-white p-2 text-black caret-teal-400 focus:outline focus:outline-teal-600"
		/>
	);
};

export default Input;
