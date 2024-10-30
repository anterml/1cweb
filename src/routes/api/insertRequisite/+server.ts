
import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { fail, json } from '@sveltejs/kit'
import RequisitesDB from '$lib/db/models/requisites'


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


const data: Omit<Requisite, 'id'>[] = [
  {
    entityId: '6678cc9cbb925ad49e48cf92',
    name: "Наименование",
    title: "",
    settings: { ...settings[0] }
  },
  {
    entityId: '6678cc9cbb925ad49e48cf92',
    name: "Описание",
    title: "",
    settings: { ...settings[0] }
  },
  {
    entityId: '6678cc9cbb925ad49e48cf92',
    name: "Цена",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    entityId: '6678cc9cbb925ad49e48cf92',
    name: "Количество",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    entityId: '6678cc9cbb925ad49e48cf92',
    name: "Сумма",
    title: "",
    settings: { ...settings[1] }
  },
  { 
    entityId: '6678cc9cbb925ad49e48cf92',
    name: "Проведен",
    title: "",
    settings: { ...settings[2] }
  },

  {
    entityId: '6678cc9cbb925ad49e48cf93',
    name: "Наименование",
    title: "",
    settings: { ...settings[0] }},
  {
    entityId: '6678cc9cbb925ad49e48cf93',
    name: "Группа",
    title: "",
    settings: { ...settings[1] }
  },

  {
    entityId: '6678cc9cbb925ad49e48cf94',
    name: "Наименование",
    title: "",
    settings: { ...settings[0] }},
  {
    entityId: '6678cc9cbb925ad49e48cf94',
    name: "Цена",
    title: "",
    settings: { ...settings[1] }
  },
  {
    entityId: '6678cc9cbb925ad49e48cf94',
    name: "Количество",
    title: "",
    settings: { ...settings[1] }
  },
]



export const GET: RequestHandler = async ({ url }) => {
  try {
    const result = await RequisitesDB.find()

    const requisites = []

    for(const item of data) {
      if(!result.find(res => res.entityId.toString() === item.entityId && res.name === item.name)) {
        requisites.push(item)
      }
    }

    if(requisites.length)
      await RequisitesDB.insertMany(requisites)

    return json({ requisites }, { status: 200 })
  } catch(e) {
    return error(400, { message: "Не получилось добавить данные"})
  }
}