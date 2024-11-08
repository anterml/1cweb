import EntityDB from '$lib/db/models/entity'
import type { LayoutServerLoad } from './$types'
import type { EntityEngKeys, EntityItem } from "$lib/stores/entityData.svelte"
import type { EntityItem } from "$lib/types/entity"

type MongoEntityItem = Omit<EntityItem, 'id'> & { _id: string }

export const load: LayoutServerLoad = async () => {
  const entites = async () => {
    const data = await EntityDB.find().lean() as MongoEntityItem[]

    const result: Record<EntityEngKeys, EntityItem[]> = {
      spravochniki: [],
      documenti: [],
    }

    for(const { _id, name, type } of data) {
      result[type].push({
        id: _id.toString(),
        name,
        type,
      })
    }

    return result
  }

	return {
		entities: await entites(),
	};
};