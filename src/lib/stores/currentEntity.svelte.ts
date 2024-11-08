import type { EntityKeys, SubEntityKeys } from '$lib/types/entity'

function createCurrentEntity() {
  type CurrentEntity = {
    entityName: EntityKeys,
    subEntityName: SubEntityKeys | "",
  }

  let currentEntity = $state<CurrentEntity>({
    entityName: "Справочники",
    subEntityName: "",
  })

  return currentEntity
}

export default createCurrentEntity()