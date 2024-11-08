<script lang="ts">
  import type { Setting } from '$lib/constants/settings'
  
  const settings: Setting[] = [
    { name: "Строка", type: 'text', len: 50 },
    { name: "Число", type: 'number', len: 10, precision: 0, negative: false }
  ]

  type Requsite = { id: string, name: string, title: string, settings: Setting }
  
  let { changeSelectedEntityId }:
      { changeSelectedEntityId: (value: string) => void } = $props()

  let requisites = $state<Requsite[]>([])

  let currentInputElem = $state<HTMLInputElement | null>()
  let contentElem = $state<HTMLElement | null>()
  let currentItem = $state<number>(0)
  
  const requisiteName = "Реквизит"

  const selectedRequisite = $derived(requisites[currentItem])

  $effect(() => {
    const value = selectedRequisite.id
    changeSelectedEntityId(value)
  })

  $effect(() => {
    // поставить на инпут фокус и выделить название реквизита, если еще не редактировали
    const startsWith = (selectedRequisite?.name || "").startsWith(requisiteName + "_")
    if(startsWith && currentInputElem) {
      currentInputElem.select()
      currentInputElem.focus()
    }

    // скролим вверх при смене резвизита
    if(contentElem)
      contentElem.scrollTop = 0
  })

  function changeRequisiteName(e: Event) {
    const target = e.target as HTMLInputElement
    selectedRequisite.name = target.value
  }

  function changeRequisiteTitle(e: Event) {
    const target = e.target as HTMLInputElement
    selectedRequisite.title = target.value
  }

  function addRequisite(e: MouseEvent) {
    const similars = requisites
      .map(requisite => requisite.name)
      .filter(value => value.startsWith(requisiteName))
    
    let i = 0
    while(similars.includes(`${requisiteName}_${++i}`)) {}
    const name = `${requisiteName}_${i}`
    requisites.push({ id: crypto.randomUUID(), name, title: "", settings: settings[0] })
    currentItem = requisites.length - 1
    currentInputElem?.select()
    currentInputElem?.focus()
  }

  function changeSettings<K extends keyof Requsite['settings']>(e: Event, name: K) {
    const target = e.target as HTMLSelectElement
    const value = target.value as Setting[K]
    const setting = settings.find(setting => setting[name] === value)

    if(name === 'type' && setting && selectedRequisite.settings[name] !== setting[name]) {
      selectedRequisite.settings = { ...setting }
    }
  }
</script>

<div class="flex-auto grid grid-cols-[200px_1fr] overflow-hidden">
  <!-- left side -->
  <div class="flex-initial border-r border-solid border-gray-400 py-2 px-5 overflow-auto">
    <div class="font-bold">
      <button onclick={addRequisite}>Реквизит ({requisites.length}) +</button>
    </div>
    
    <div class="">
      {#each requisites as requisite, i}
        <div
          class={`cursor-pointer hover:text-red-500 mt-1 ${selectedRequisite?.id === requisite.id ? 'text-red-500' : ''}`}
          onclick={() => currentItem = i}>
          - {requisite.name}
        </div>
      {/each}
    </div>
  </div>

  <!-- right side -->
  <div
    class={`${currentItem >= 0 ? "visible" : "invisible"} flex flex-col gap-y-1 flex-auto py-2 px-5 overflow-auto border-r border-solid border-gray-400`}
    bind:this={contentElem}>
    <label class="flex flex-col mb-1">
      <span>Название</span>
      <input
        class="border border-solid border-black p-1"
        name="requisite"
        oninput={changeRequisiteName}  
        value={selectedRequisite?.name}
        bind:this={currentInputElem}
      />
    </label>

    <label class="flex flex-col mb-1">
      <span>Заголовок</span>
      <input
        class="border border-solid border-black p-1"
        name="requisite"
        oninput={changeRequisiteTitle}  
        value={selectedRequisite?.title}
      />
    </label>

    <label class="flex flex-col mb-1">
      <span>Тип</span>
      <select class='border border-solid border-black p-1' onchange={(e) => changeSettings(e, 'type')}>
        {#each settings as setting }
          <option
            value={setting.type}
            selected={selectedRequisite?.settings.type === setting.type}>
            {setting.name}
          </option>
        {/each}
      </select>
    </label>
    {#if 'len' in selectedRequisite.settings}
      <label class="flex flex-col mb-1">
        <span>Длина</span>
        <input
          class="border border-solid border-black p-1"
          type='number'
          name='len'
          value={selectedRequisite.settings.len} />
      </label>
    {/if}
    {#if 'precision' in selectedRequisite.settings}
      <label class="flex flex-col mb-1">
        <span>Точность</span>
        <input
          class="border border-solid border-black p-1"
          type='number'
          name='precision'
          value={selectedRequisite.settings.precision} />
      </label>
    {/if}
  </div>
</div>