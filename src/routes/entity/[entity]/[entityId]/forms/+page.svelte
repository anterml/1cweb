<script lang="ts">
  import Content from "./content.svelte"
  import Editor from "./editor.svelte"
  import { page } from "$app/stores"
  import type { Requisite } from "$lib/constants/settings"
  let { data } = $props()

  let currentRequisite = $derived<Requisite | undefined>(
    data.requisites.find(req => req.id === $page.url.searchParams.get('requisiteId'))
  )
  let prevEntityId: string = ''

  $effect(() => {
    if(data.params.entityId !== prevEntityId) {
      prevEntityId = data.params.entityId
    }
  })

</script>

<div class="grid grid-cols-[1fr_2fr] h-full border-t border-solid border-gray-400">
  <Content requisites={data.requisites} currentRequisite={currentRequisite}/>
  <Editor requisite={currentRequisite}/>
</div>