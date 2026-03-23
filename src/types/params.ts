import { SEARCH_PARAMS } from "@/constants/navigation";

export type SearchParamKey = (typeof SEARCH_PARAMS)[keyof typeof SEARCH_PARAMS];

export type ListRouteParams = {
	listTitle: string;
	listId: string;
};

export type ParsedSearchParams = {
	[K in SearchParamKey]?: string | string[] | undefined;
};

export interface PageProps {
	params: Promise<ListRouteParams>;
	searchParams: Promise<ParsedSearchParams>;
}
