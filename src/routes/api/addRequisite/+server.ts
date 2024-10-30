
import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

import RequisiteDB from '$lib/db/models/requisites'
import { settings, type Requisite } from '$lib/constants/settings'

export const GET: RequestHandler = async ({ url }) => {
  const entityId = url.searchParams.get('entityId')
  const name = url.searchParams.get('name')

  if(!entityId) {
    return error(400, { message: "Не указан entityId для создания реквизита"})
  }
  if(!name) {
    return error(400, { message: "Не указано имя для создания реквизита"})
  }

  try {
    const data: Omit<Requisite, 'id'> = {
      name,
      entityId,
      title: "",
      settings: { ... settings[0] }
    }

    const requisite = await RequisiteDB.create(data)
    return json({ requisite }, { status: 200 })
  } catch(e) {
    return error(400, { message: "Не получилось добавить реквизит"})
  }
}

