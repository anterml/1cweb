<script lang="ts">
	import { page } from '$app/stores'
  import { replaceState } from '$app/navigation'
  import type { Requisite } from "$lib/constants/settings"

  type Props = {
    requisites: Requisite[],
    currentRequisite: Requisite | undefined,
  }

  let {
    requisites,
    currentRequisite,
  }: Props = $props()
  
  function selectRequisite(e: MouseEvent) {
    const target = e.target as HTMLInputElement
    const id = target.dataset.id as string
    const currentRequisite2 = requisites.find(req => req.id === id)
    if(currentRequisite2) {
      const params = $page.url.searchParams
      params.set("requisiteId", id)
      replaceState("?" + params.toString(), {})
    }
  }
</script>

<div class="list1 flex flex-col scroll-y">
  {#each requisites as requisite}
    {@const selected = requisite.id === currentRequisite?.id}
    <div class={`container-padding list1-item relative snap-start ${selected ? 'active' : ''}`}>
      <div
        class='cursor-pointer font-medium hover:text-black'
        onclick={selectRequisite}
        data-id={requisite.id}>
        {requisite.name}
      </div>
      {#if selected}
        <div class="absolute top-[50%] right-0 -translate-y-[50%]
        border-r-white border-[10px] border-l-0 border-transparent border-solid"></div>
      {/if}
    </div>
  {/each}
</div>