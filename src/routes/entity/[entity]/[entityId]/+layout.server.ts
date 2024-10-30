import Requisites from '$lib/db/models/requisites'
import { error, redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export type Setting = 
| { name: "Строка", type: 'text', len: number }
| { name: "Число", type: 'number', len: number, precision: number, negative: boolean }
| { name: "Чекбокс", type: 'checkbox', enabled: boolean }

export type Requisite = {
  id: string,
  entityId: string,
  name: string,
  title: string,
  settings: Setting
}


type MongoRequisite = Omit<Requisite, 'id'> & { _id: string }

export const load: LayoutServerLoad = async ({ params, url }) => {
  const getRequisites = async () => {
    const requisiteId = url.searchParams.get("requisiteId") 
    const { entityId } = params

    if(!entityId)
      return error(404, { message: "No entityId" })
    
    const requisites = await Requisites.find({ entityId }).lean() as MongoRequisite[]

    // не передан requisiteId
    if(!requisiteId) {
      // есть другие реквизиты - изменяем на первый в списке
      if(requisites.length) {
        //console.log("Реквизит не передан, выбираем первый в списке")
        url.searchParams.set('requisiteId', requisites[0]._id)
        return redirect(301, url)
      } else {
        //console.log("Реквизит не передан и у сущности их нет")
        return []
      }
    }

    const targetRequisite = requisites.find(value => value._id.toString() === requisiteId)
    if(!targetRequisite) {
      // сущность без реквизитов
      if(requisites.length === 0) {
        url.searchParams.delete("requisiteId")
        return redirect(301, url)
      }
      // выбираем первый реквизит в списке
      else {        
        url.searchParams.set("requisiteId", requisites[0]._id)
        return redirect(301, url)
      }
    }

    const result = []

    for(const { _id, name, entityId, settings, title } of requisites) {
      result.push({
        id: _id.toString(),
        entityId: entityId.toString(),
        name,
        title,
        settings,
      })
    }

    return result
  }

	return {
		requisites: await getRequisites(),
	};
};