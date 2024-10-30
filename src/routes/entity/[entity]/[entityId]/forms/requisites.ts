export type Setting = 
| { name: "Строка", type: 'text', len: number }
| { name: "Число", type: 'number', len: number, precision: number, negative: boolean }
| { name: "Чекбокс", type: 'checkbox', enabled: boolean }

const settings: Setting[] = [
  { name: "Строка", type: 'text', len: 50 },
  { name: "Число", type: 'number', len: 10, precision: 0, negative: false },
  { name: "Чекбокс", type: 'checkbox', enabled: false },
]

export type Requisite = { id: string, entityId: string, name: string, title: string, settings: Setting }


export let requisiteData: Requisite[] = [
  {
    id: '130bb5e2-f6ba-4a82-8e94-e5eae0a4cecb',
    entityId: 'ad504f60-1c59-4bdf-98e7-bcfa51196df3',
    name: "Наименование",
    title: "",
    settings: { ...settings[0] }
  },
  {
    id: 'e2e40ef0-2405-489b-93fb-bcd8dbe61385',
    entityId: 'ad504f60-1c59-4bdf-98e7-bcfa51196df3',
    name: "Описание",
    title: "",
    settings: { ...settings[0] }
  },
  {
    id: 'dcba5e63-1b31-4efe-b6ff-483ba003b082',
    entityId: 'ad504f60-1c59-4bdf-98e7-bcfa51196df3',
    name: "Цена",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    id: '7de13b42-96d5-4f10-9d05-d643f6e999c3',
    entityId: 'ad504f60-1c59-4bdf-98e7-bcfa51196df3',
    name: "Количество",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    id: '200ec054-55ea-49b6-9137-ffdfbb3aa821',
    entityId: 'ad504f60-1c59-4bdf-98e7-bcfa51196df3',
    name: "Сумма",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    id: '7aed47f6-a333-47bd-9b5c-03d7e357ecac',
    entityId: 'ad504f60-1c59-4bdf-98e7-bcfa51196df3',
    name: "Проведен",
    title: "",
    settings: { ...settings[2] }
  },

  {
    id: '9de4ca99-50b1-4c07-b6f3-b3fbdb954bf8',
    entityId: 'f4832d20-df45-4e3f-8c2b-f89604659b6e',
    name: "Наименование",
    title: "",
    settings: { ...settings[0] }},
  {
    id: 'd5de5c59-e07a-4c1e-a08e-be4044986eec',
    entityId: 'f4832d20-df45-4e3f-8c2b-f89604659b6e',
    name: "Группа",
    title: "",
    settings: { ...settings[1] }
  },

  {
    id: 'ccde7d23-2789-43ce-a675-b9e11cdccdb1',
    entityId: 'a80d9d21-20f0-44fc-9efe-b1d6913ec19b',
    name: "Наименование",
    title: "",
    settings: { ...settings[0] }},
  {
    id: 'd5ab4999-a2f2-444b-a33f-e1537239eeb2',
    entityId: 'a80d9d21-20f0-44fc-9efe-b1d6913ec19b',
    name: "Цена",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    id: '3ea6d7ce-22d6-4ca3-b9af-486c9bfab71d',
    entityId: 'a80d9d21-20f0-44fc-9efe-b1d6913ec19b',
    name: "Количество",
    title: "",
    settings: { ...settings[1] }
  },
]