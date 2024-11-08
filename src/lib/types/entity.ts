	export type EntityKeys = "Справочники" | "Документы"
  export type SubEntityKeys = "Реквизиты" | "Формы" | "Табличные части"
  export type EntityEngKeys = "spravochniki" | "documenti"
  export type Setting = 
  | { name: "Строка", type: 'text', len: number }
  | { name: "Число", type: 'number', len: number, precision: number, negative: boolean }
