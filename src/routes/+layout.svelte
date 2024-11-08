<script lang="ts">
  import "../app.css"
  import { subentityUrl } from '$lib/stores/subentityUrl.svelte'
  import { goto } from '$app/navigation'
  import { page } from "$app/stores"
  import { type EntityEngKeys, entityData } from "$lib/stores/entityData.svelte"
  import { langStore, LANGS, type LangName } from "$lib/stores/lang.svelte"

  let { children, data } = $props()

  const langEng2ru: Record<EntityEngKeys, string> = {
    spravochniki: "Справочники",
    documenti: "Документы",
  }

  const ENTITY_CATEGORIES: EntityEngKeys[] = [
    'spravochniki',
    'documenti'
  ]

  let expandedEntities = $state<EntityEngKeys[]>(
    data.params.entity
      ? [data.params.entity as EntityEngKeys]
      : []
  )
  
  function expandEntity(value: EntityEngKeys) {
    if(expandedEntities.includes(value))
      expandedEntities = expandedEntities.filter(target => target !== value)
    else
      expandedEntities.push(value)
  }

  function goToUrl(entity: EntityEngKeys, entityId: string) {
    const split = location.pathname.split("/").slice(0, 4)
    if(split[1] === 'entity') {
      split[2] = entity
      split[3] = entityId
    }
    goto(split.join("/"))
  }

  let contextItemIndex = 0
  // --- EntityPortal
  let entityPortal: HTMLElement;
  let entityPortalVisible = $state<boolean>(false)
  let currentEntityName: EntityEngKeys | undefined;

  function showEntityPortal(e: MouseEvent) {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    entityPortalVisible = true
    entityPortal.style.top = (e.offsetY + 3) + 'px'
    entityPortal.style.left = (e.offsetX + 3) + 'px'
    entityPortal.style.display = ''
    currentEntityName = target.dataset.name as EntityEngKeys
    target.append(entityPortal)
    const elem = entityPortal.children[0]
    elem && (elem as HTMLElement).focus()
  }

  function hideEntityPortal() {
    entityPortalVisible = false
  }

  function portalEntityOnkeypress(e: KeyboardEvent) {
    const target = e.target as HTMLElement
    
    if(e.key === 'Enter') {
      hideEntityPortal()
      return addEntity(target.dataset.event || "")
    }

    if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp')
      return console.log('arrow', e.key, e.key !== 'ArrowDown', e.key !== 'ArrowUp')

    const count = entityPortal.children.length
    contextItemIndex += e.key === 'ArrowDown' ? 1 : -1

    let i = (contextItemIndex % count)
    if(i < 0)
      i += count

    const elem = entityPortal.children[i] as HTMLElement
    elem?.focus()
  }

  function createEntity(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    const target = e.target as HTMLElement
    const event = target.dataset.event || ""
    hideEntityPortal()
    if(event === 'create')
      addEntity(event)
  }

  async function addEntity(eventName: string) {
    if(!currentEntityName)
      return

    // ищет макс числовой суффикс
    // пример: Справочник_2, Справочник_5,
    // найдет 5 ...
    let maxNumberSuffix = 0
    const prefixName = `${langEng2ru[currentEntityName]}_`

    for(const { name } of data.entities[currentEntityName]) {
      if(name.startsWith(prefixName)) {
        const currMaxNumberSuffix = Number(name.split("_")[1]) || 0
        maxNumberSuffix = Math.max(maxNumberSuffix, currMaxNumberSuffix)
      }
    }

    // ... новое имя станет Справочник_6
    const name = prefixName + (++maxNumberSuffix)

    try {
      const response = await fetch(`/api/addEntity?type=${currentEntityName}&name=${name}`)
      const result = await response.json()
      result.entity.id = result.entity._id
      data.entities[currentEntityName].push(result.entity)
      goToUrl(currentEntityName, result.entity.id)
    } catch(e) {
      console.log(e)
    }
  }

  
  // --- SubentityPortal
  let subentityPortal: HTMLElement;
  let subentityPortalVisible = $state<boolean>(false)

  function showSubentityPortal(e: MouseEvent) {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    subentityPortalVisible = true
    subentityPortal.style.top = (e.offsetY + 3) + 'px'
    subentityPortal.style.left = (e.offsetX + 3) + 'px'
    subentityPortal.style.display = ''
    target.append(subentityPortal)
    subentityPortal.focus()
  }

  function hideSubentityPortal(e: MouseEvent) {
    subentityPortalVisible = false
  }

  function selectSubentity(e: Event) {
    // to do
  }

  function addSubentity(e: Event) {
    // to do
  }

  function preventContextMenu(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleGlobalClick(e: MouseEvent) {
    entityPortal.style.display = 'none'
    contextItemIndex = 0
  }
  
  // Смена языка
  const langNames = Object.keys(LANGS) as LangName[]
  function changeLang(e: Event) {
    const target = e.target as HTMLSelectElement
    langStore.name = target.value as LangName
  }
</script>

<div class="grid grid-cols-[250px_1fr] h-screen" onclick={handleGlobalClick}>
  <div class="container-padding side-panel">
    <!-- Смена языка -->
    <select onchange={changeLang}>
      {#each langNames as lang}
        <option value={lang} selected={lang === langStore.name}>
          {LANGS[lang]}
        </option>
      {/each}
    </select>

    <div><a href="/">Главная</a></div>
    <div><a href="/content">Контент</a></div>
    <div><a href="/htmlcomponents">HTML компоненты</a></div>

    <ul
      onclick={selectSubentity}
      oncontextmenu={showSubentityPortal}
      role="menu"
      tabindex="0"
      class={`${subentityPortalVisible ? 'block' : 'hidden'} z-10 bg-white absolute top-2 right-2 border border-solid border-black p-3`}
      bind:this={subentityPortal}>
      <li role="menuitem" tabindex="0">Добавить реквизит</li>
      <li role="menuitem" tabindex="0">Добавить документ</li>
    </ul>

    <div class="h-0.5 my-2 bg-slate-500"></div>

    <ul
      onclick={createEntity}
      onkeydown={portalEntityOnkeypress}
      oncontextmenu={preventContextMenu}
      role="menu"
      tabindex="0"
      class={`${entityPortalVisible ? 'block' : 'hidden'} z-10 bg-white absolute top-2 right-2 w-52 rounded-sm p-0.5`}
      bind:this={entityPortal}>
      <li class="rounded-sm px-2 py-1 hover:bg-slate-400" role="menuitem" tabindex="0" data-event="create">Добавить</li>
      <li class="rounded-sm px-2 py-1 hover:bg-slate-400" role="menuitem" tabindex="0" data-event="properties">Свойства</li>
      <li class="rounded-sm px-2 py-1 hover:bg-slate-400" role="menuitem" tabindex="0" data-event="properties">Заголовок</li>
      <li class="rounded-sm px-2 py-1 hover:bg-slate-400" role="menuitem" tabindex="0" data-event="properties">Описание</li>
    </ul>

    {#each ENTITY_CATEGORIES as name}
      {@const capitalizeName = name.charAt(0).toUpperCase() + name.substring(1)}
      {@const values = entityData.filter(value => value.type === name)}
      <div class="">
        <div class="hover:bg-slate-500 flex flex-row flex-nowrap justify-between py-1 px-1.5 cursor-pointer">
          <div data-contextmenu
            onclick={() => expandEntity(name)}
            oncontextmenu={showEntityPortal}
            data-name={name}
            class="flex-auto relative">
            {capitalizeName} ({values.length})
          </div>
        </div>
        {#if values.length && expandedEntities.includes(name)}
          <ul>
            {#each data.entities[name] as entity}
              <li
                class:selected={$page.url.pathname.includes(entity.id)}
                class="hover:text-red-500 hover:bg-gray-300 pl-5"
                oncontextmenu={addSubentity}
                >
                <a class="block py-1" href={`/entity/${name}/${entity.id}/${subentityUrl.value}`}>- {entity.name}</a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
  {@render children()}
</div>

<style lang="postcss">
  .selected {
    color: var(--color2);
  }

  .side-panel {
    box-shadow: 1px 0 4px 1px #0000001a;
    z-index: 10;
  }
</style>