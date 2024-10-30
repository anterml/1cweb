function createCurrentEntity() {
  type SubEntityKeys = "Реквизиты" | "Формы" | "Табличные части"

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