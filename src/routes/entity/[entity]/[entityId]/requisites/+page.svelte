<script lang="ts">
  import { page } from "$app/stores";
  import type { Requisite } from "$lib/constants/settings"
  import { pushState, replaceState, goto, invalidate } from "$app/navigation"
  import Content from './content/content.svelte'
  import Settings from './settings.svelte'
  import { langStore, langsData } from "$lib/stores/lang.svelte"
  import type { PageStateNewRequisite } from "./types"
  
  let { data } = $props()

  let currentRequisite = $derived<Requisite | undefined>(
    data.requisites.find(req => req.id === $page.url.searchParams.get('requisiteId'))
  )

  async function removeRequisite() {
    const requisite = data.requisites.find(req => req.id === $page.url.searchParams.get('requisiteId'))
    if(requisite) {
      const pos = data.requisites.indexOf(requisite)
      const { searchParams } = $page.url
      let nextRequisite = data.requisites[pos + 1] || data.requisites[pos - 1]
      if(pos >= 0 && nextRequisite) {
        searchParams.set('requisiteId', nextRequisite.id)
        try {
          const response = await fetch(`/api/removeRequisite?id=${requisite.id}`, { method: 'DELETE' })
          const result = await response.json()
          console.log(result)
          await goto($page.url.pathname + "?" + searchParams.toString(), { invalidateAll: true })
        } catch(e) {
          console.log(e)
        }
      } 
    }
  }

  async function addRequisite() {
    let maxNumberSuffix = 0
    const prefixName = `${langsData[langStore.name].requisite}_`

    for(const { name } of data.requisites) {
      if(name.startsWith(prefixName)) {
        const currMaxNumberSuffix = Number(name.split("_")[1]) || 0
        maxNumberSuffix = Math.max(maxNumberSuffix, currMaxNumberSuffix)
      }
    }

    const name = prefixName + (++maxNumberSuffix)

    try {
      const response = await fetch(`/api/addRequisite?entityId=${data.params.entityId}&name=${name}`)
      const result: { requisite: Requisite & { _id: string } } = await response.json()
      result.requisite.id = result.requisite._id as string
      data.requisites.push(result.requisite)
      const params = $page.url.searchParams
      const { id } = result.requisite
      params.set("requisiteId", id)
      const state: PageStateNewRequisite = {
        newRequisite: { id, name }
      }
      pushState("?" + params.toString(), state)
    } catch(e) {
      console.log(e)
    }
  }
</script>
<div class="container-padding">
  <button class="btn btn-primary" onclick={addRequisite}>Добавить реквизит</button>
  <button class="btn btn-primary" onclick={removeRequisite}>Удалить реквизит</button>
</div>
<div class="layout grid grid-cols-[1fr_2fr] h-full border-t border-solid border-gray-400">
  <Content requisites={data.requisites} currentRequisite={currentRequisite} />
  {#if currentRequisite}
    <Settings requisite={currentRequisite}/>
  {:else}
    <div>Нет данных</div>
  {/if}
</div>

<style>
  .layout {
    grid-template-columns: 300px 1fr;
    align-items: start;
  }

  @container (width < 600px) {
    .layout {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      border: 1px solid red;
    }
  }
</style>