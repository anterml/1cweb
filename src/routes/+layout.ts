import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params, data }) => {

	return {
		entities: data.entities,
		params,
	};
};