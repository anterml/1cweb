
import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import EntityDB from '$lib/db/models/entity'

function generageEntityData() {
  return [
    {
      "id": "ad504f60-1c59-4bdf-98e7-bcfa51196df3",
      "name": "Склады",
      "type": "spravochniki"
    },
    {
      "id": "f4832d20-df45-4e3f-8c2b-f89604659b6e",
      "name": "Организации",
      "type": "spravochniki"
    },
    {
      "id": "a80d9d21-20f0-44fc-9efe-b1d6913ec19b",
      "name": "Подразделения",
      "type": "spravochniki"
    },
    {
      "id": "5e84d9db-e16e-4f35-97ca-20b7f08d23df",
      "name": "Одежда",
      "type": "spravochniki"
    },
    {
      "id": "475dc615-8422-4783-8a8d-f0bcf784c704",
      "name": "Контрагенты",
      "type": "spravochniki"
    },
    {
      "id": "f99f9666-91a5-490c-97a1-fb1ff4a7969a",
      "name": "Покупка",
      "type": "documenti"
    },
    {
      "id": "655e332b-ddae-48fc-b395-9812f4d97e0d",
      "name": "Потребление",
      "type": "documenti"
    },
    {
      "id": "632a02ea-8f43-4851-a6e5-d7b239688688",
      "name": "Задачи",
      "type": "documenti"
    },
    {
      "id": "9315f830-26b4-4a9e-94ca-49777e59525c",
      "name": "Накладные",
      "type": "documenti"
    }
  ]
}

export const GET: RequestHandler = async ({ url }) => {
  const type = url.searchParams.get('type')

  if(!type) {
    return error(400, { message: "Нет типа"})
  }

  const data = generageEntityData().filter(value => value.type === type)
  const entities = await EntityDB.find({ type })
  const uniqueData = []

  for(const { name, type } of data) {
    if(!entities.find(entity => entity.name === name))
      uniqueData.push({ name, type })
  }

  if(uniqueData.length) {
    try {
      await EntityDB.insertMany(uniqueData)
      return json({ message: "Данные добавлены", inserted: uniqueData.length }, { status: 201 });
    } catch(e) {
      return error(400, { message: "Не получилось добавить данные"})
    }
  }
  
  return json({ message: "Нет данных для вставки" }, { status: 200 });
};

