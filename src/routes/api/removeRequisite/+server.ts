
import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

import RequisiteDB from '$lib/db/models/requisites'

export const DELETE: RequestHandler = async ({ url }) => {
  const id = url.searchParams.get('id')

  if(!id) {
    return error(400, { message: "Не указан requisiteId для удаления реквизита"})
  }

  try {
    RequisiteDB.deleteOne
    await RequisiteDB.deleteOne({ _id: id })
    return json(
      { message: `Реквизит ${id} был удален` },
      { status: 200 }
    )
  } catch(e) {
    return error(400, { message: "Не получилось удалить реквизит"})
  }
}

