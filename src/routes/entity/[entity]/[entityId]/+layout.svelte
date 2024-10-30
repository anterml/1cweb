<script lang="ts">
  import { subentityUrl } from '$lib/stores/subentityUrl.svelte'
  import { page } from '$app/stores'
  const tabs1 = ["Реквизиты", "Табличная часть", "Формы"]
  const tabs = ["requisites", "tableparts", "forms", 'one']
  let { data, children } = $props()

  let currentTab = $derived($page.url.pathname.split("/").reverse()[0])

  //$inspect($page.url.searchParams)
  $effect(() => {
    if(tabs.includes(currentTab)) {
      subentityUrl.value = currentTab
    }
  })
  //$inspect(search)
</script>

<div class="layout1 flex flex-col flex-auto">
  <ul class="flex flex-row container-padding">
    {#each tabs as tab}
      <li class="mr-5">
        <a
          class={`${currentTab === tab ? 'text-red-500 border-b border-solid border-red-500 pb-2' : ''}`}
          href={`/entity/${data.params.entity}/${data.params.entityId}/${tab}/${$page.url.search}`}>
          {tab}
        </a>
      </li>
    {/each}
  </ul>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .layout1 {
    container-type: inline-size;
    overflow-y: hidden;
  }

  .content {
    flex: 1 1 auto;
    overflow: hidden;
  }
</style>