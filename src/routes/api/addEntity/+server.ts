
import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'
import EntityDB from '$lib/db/models/entity'

export const GET: RequestHandler = async ({ url }) => {
  // const id = new mongoose.Types.ObjectId()
  // return new Response(id.toString())
  const type = url.searchParams.get('type')
  const name = url.searchParams.get('name')

  if(!type) {
    return error(400, { message: "Не указан тип для создание сущности"})
  }
  if(!name) {
    return error(400, { message: "Не указано имя для создание сущности"})
  }

  try {
    const entity = await EntityDB.create({
      type,
      name,
    })

    return json({ entity }, { status: 200 })
  } catch(e) {
    return error(400, { message: "Не получилось добавить данные"})
  }
}

