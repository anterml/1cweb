<script lang="ts">
  import Content from "./content.svelte"
  import Editor from "./editor.svelte"
  import { page } from "$app/stores";
  import type { Requisite } from "$lib/constants/settings"
  import { replaceState } from "$app/navigation";
  let { data } = $props()

  let currentRequisite = $derived<Requisite | undefined>(
    data.requisites.find(req => req.id === $page.url.searchParams.get('requisiteId'))
  )
  let prevEntityId: string = ''

  $effect(() => {
    if(data.params.entityId !== prevEntityId) {
      const params = new URLSearchParams(window.location.search)
      const requisite = data.requisites.find(value => value.id === params.get("requisiteId"))
      //currentRequisite = requisite || data.requisites[0]
      prevEntityId = data.params.entityId
    }
  })

</script>
<div>hello {currentRequisite && currentRequisite.id}</div>
<div class="grid grid-cols-[1fr_2fr] h-full border-t border-solid border-gray-400">
  <Content requisites={data.requisites} currentRequisite={currentRequisite}/>
<!--   <Content requisites={data.requisites} bind:currentRequisite={currentRequisite} />
 -->  <Editor requisite={currentRequisite}/>
</div>
