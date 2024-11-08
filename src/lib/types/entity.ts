export type EntityKeys = "Справочники" | "Документы"
export type SubEntityKeys = "Реквизиты" | "Формы" | "Табличные части"
export type EntityEngKeys = "spravochniki" | "documenti"

export type EntityItem = {
  id: string,
  type: EntityEngKeys,
  name: string,
}