import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
  //const { myparams } = await parent();
  return {
    //myparams,
    params,
  }
}