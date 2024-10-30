export type Setting = 
  | { name: "Строка", type: 'text', len: number }
  | { name: "Число", type: 'number', len: number, precision: number, negative: boolean }
  | { name: "Чекбокс", type: 'checkbox', enabled: boolean }

export type Requisite = { id: string, entityId: string, name: string, title: string, settings: Setting }

export const settings: Setting[] = [
  { name: "Строка", type: 'text', len: 50 },
  { name: "Число", type: 'number', len: 10, precision: 0, negative: false },
  { name: "Чекбокс", type: 'checkbox', enabled: false },
]