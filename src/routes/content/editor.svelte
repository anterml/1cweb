<script lang="ts">
  import Record from "$lib/entities/creating/record.svelte"
  import Monaco from "$lib/monaco/monaco.svelte";
  import { setContext } from "svelte";
  
  let {
    currentEntity,
  }: {
    currentEntity: EntityKeys,
  } = $props()

  let selectedEntityId = $state<string>('')

  function changeSelectedEntityId(value: string) {
    selectedEntityId = value
  }
</script>


<div class="flex flex-col fixed top-10 right-10 left-10 bottom-10 z-40
  rounded bg-white p-5 shadow-2xl">
  <div class="flex justify-between py-2 px-5">
    <h2>{currentEntity} {selectedEntityId}!</h2>
  </div>

  <div class="grid grid-cols-[1fr_1fr] flex-auto">
    <div class="overflow-y-scroll">
      <Record {changeSelectedEntityId} />
    </div>
    <Monaco fileName={selectedEntityId} />
  </div>
</div>


<!--<MonacoEditor fileName="requisite3" />-->
