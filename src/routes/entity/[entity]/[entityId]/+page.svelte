<script lang="ts">
  import { entityData, type EntityItem } from '$lib/stores/entityData.svelte'
  import { page } from '$app/stores'
  
  const { data } = $props()

  let currentEntity = $derived(entityData.find(entity => entity.id === data.params.entityId))
  let nameElem: HTMLInputElement | null

  const tabs = ["Реквизиты", "Табличная часть", "Формы"]

  $inspect(data)

  $effect(() => {
    if(currentEntity && nameElem) {
      // поставить на инпут фокус и выделить название сущности, если еще не редактировали
      const startsWith = (currentEntity.name || "").startsWith(currentEntity.type + "_")
      if(nameElem && startsWith) {
        nameElem.select()
        nameElem.focus()
      }
    }
  })

  function changeEntityName(e: Event) {
    const target = e.target as HTMLInputElement
    if(!target.value) {
      target.value = currentEntity!.name
    } else {
      currentEntity!.name = target.value
    }
  }
</script>

<div>
  {#if currentEntity}
    <input
      class="border border-solid border-black py-1 px-2"
      bind:this={nameElem}
      value={currentEntity!.name}
      onchange={changeEntityName} />
  {/if}
</div>