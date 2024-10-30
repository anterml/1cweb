<script lang="ts">
  import Monaco from "$lib/monaco-lite/monaco.svelte"
  import type { Requisite } from "$lib/constants/settings"

  type Props = { requisite: Requisite | undefined }
  const { requisite }: Props = $props()
</script>


<div class="flex flex-col bg-white p-5 flex-auto">
  <input class="border border-solid border-black" value="" />

  {#if requisite}
    <Monaco requisite={requisite} />
  {/if}

</div>
