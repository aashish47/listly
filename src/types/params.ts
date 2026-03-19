export type ListParams = {
	listTitle: string;
	listId: string;
	alpha?: string;
};

export type ListParamsPromise = Promise<ListParams>;
