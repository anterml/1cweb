<script lang="ts">
  import { page } from "$app/stores"
  import selectedEntity from '$lib/currentEntity.svelte'

  type SelectedEntity = typeof selectedEntity
  const data: SelectedEntity['subEntityName'][] = [
    'Реквизиты', 'Табличные части', 'Формы'
  ]
  
  $effect(() => {
    console.log("page", $page.url.searchParams)
  })

  $effect(() => {
    selectedEntity;
    console.log('hello', selectedEntity)
  })
</script>

<div class="flex flex-row gap-3 items-start">
  {#each data as entity}
    <a href={`/content?subentity=${entity}`}
      class:active={selectedEntity.subEntityName === entity}
      class="px-3 py-2 border border-solid border-black cursor-pointer hover:text-red-500"
      onclick={() => { selectedEntity.subEntityName = entity; console.log('uuu', $page.url.searchParams.set('subentity', entity))}}>{entity}</a>
  {/each}
</div>

<style>
  .active {
    color: red;
  }
</style>