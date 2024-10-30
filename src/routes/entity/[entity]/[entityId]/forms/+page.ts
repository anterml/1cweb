import type { PageLoad } from './$types'
import { requisiteData } from "./requisites"

export const load: PageLoad = ({ params }) => {
  return {
    params,
    requisiteData: requisiteData.filter(value => value.entityId === params.entityId),
  }
};