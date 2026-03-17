export type Action = {
	success: boolean;
	message: string;
	date: number;
};

export type ActionPromise = Promise<Action>;
