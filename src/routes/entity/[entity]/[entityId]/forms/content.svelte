<script lang="ts">
  import { untrack } from "svelte"
  import { type Requisite } from "./requisites"
  import { editorInjectData } from '$lib/stores/editorInjectData.svelte'
  import { onlyNumberInputs } from '$lib/stores/onlyNumberInputs.svelte'
  import { replaceState } from "$app/navigation"
  import { page } from "$app/stores";
  type Props = {
    requisites: Requisite[],
    currentRequisite: Requisite | undefined,
  }

  let {
    requisites,
    currentRequisite,// = $bindable(),
  }: Props = $props()

  let inputs = $state<Record<string, HTMLInputElement>>({})

  let currentInput = $derived(
    Object.values(inputs).find(input => input && input.dataset.id === currentRequisite?.id)
  )

  $effect(() => {
    if(currentInput) {
      currentInput.focus()
    }
  })

  $effect(() => {
    const id = currentRequisite?.id
    console.log("ID", id)
  })

  $effect(() => {
    editorInjectData.value = requisites.map(({ name }) => name)
    onlyNumberInputs.value = requisites
      .filter(value => value.settings.type === 'number' && currentRequisite?.id !== value.id)
      .map(({ name }) => name)
  })

  $effect(() => {
    loadModule(requisites.map(({ id }) => id)).then(() => {
      //console.log('modulesData', modulesData)
    })
  })
  

  type OnFormInput = {
    observeFields: string[],
    handle(currentInput: HTMLInputElement, inputs: Record<string, HTMLInputElement>, triggerInput: HTMLInputElement): void,
  }

  type Func = (node: HTMLInputElement, nodes: Record<string, HTMLInputElement>) => any | undefined;
  type ModuleData = {
    onchange: Func,
    oninput: Func,
    onforminput: OnFormInput,
    onformchange: Func,
    validate: (value: string) => boolean
  }

  let modulesData: Record<string, ModuleData> = {}

  async function change(e: Event) {
    const target = e.target as HTMLInputElement
    const requisiteId = target.dataset.id as Requisite['id']
    //console.log('original change', onchange)
    Object.keys(modulesData).forEach(id => {

    })

    const module = modulesData[requisiteId]
    if(!module) {
      return
    }
    if(typeof module.onchange === 'function') {
      const value = module.onchange(target, inputs)
      if(value != undefined)
        target.value = value
    }

    if(typeof module.validate === 'function') {
      if(!module.validate(target.value)) {
        return console.log('bad validate')
      }
    }
  }

  async function input(e: Event) {
    const trigger = e.target as HTMLInputElement
    const requisiteId = trigger.dataset.id as Requisite['id']
    //console.log('original change', onchange)
    Object.keys(modulesData).forEach(id => {
      const module = modulesData[id]
      if(module && module.onforminput) {
        if(typeof module.onforminput.handle !== 'function') {
          return console.log("ERROR onforminput is not function", id)
        }

        const observers = Array.isArray(module.onforminput.observeFields)
          ? module.onforminput.observeFields
          : []

        if(!observers.length) {
          // просто предупреждение
          console.log("Не указаны обсерверы для реквизита", id, "Это сделано намеренно?")
        }
        // не реагировать, т.к. нет в обсерверах
        else if(!observers.includes(trigger.name)) {
          return
        }

        const _inputs: typeof inputs = {}

        Object.keys(inputs).forEach(name => {
          if(observers.includes(name))
            _inputs[name] = inputs[name]
        })

        const target = Object.values(inputs).find(input => input.dataset.id === id)

        if(!target) {
          return console.log("Элемент обработчика не найден", id)
        }
        const value = module.onforminput.handle(target, _inputs, trigger)
        if(value != undefined)
          target.value = value
      }
    })

    const module = modulesData[requisiteId]
    if(module && typeof module.oninput === 'function') {
      const value = module.oninput(trigger, inputs)
      if(value != undefined)
        trigger.value = value
    }
  }



  async function loadModule(requisiteIds: string[]) {
    try {
      /*const modules2 = import.meta.glob('$lib/types/*.ts', {
        //eager: true,
        query: '?url',
      })

      const modules3 = import.meta.glob('$lib/types/*.ts', {
        query: '?raw',
      })

      console.log("MODULES2", modules2)
      console.log("MODULES3", modules3) */
      const imports = requisiteIds.map(id => 
        import(`$lib/types/${id}.ts`).catch(() => {})
      )
      const modules = await Promise.all(imports)
      
      modulesData = {}

      modules.forEach((module, i) => {
        modulesData[requisiteIds[i]] = module
      })
    } catch(e) {
      console.log('eeee')
    }
  }

  function selectRequisite(e: MouseEvent) {
    const target = e.target as HTMLInputElement
    const id = target.dataset.id as string
    //currentRequisite = requisites.find(req => req.id === id)
    const currentRequisite2 = requisites.find(req => req.id === id)
    if(currentRequisite2) {
      console.log("currentrequisite", id)
      const params = $page.url.searchParams
      params.set("requisiteId", id)
      replaceState("?" + params.toString(), {})
    }

  }


/*   async function focus(e: Event) {
    const target = e.target as HTMLInputElement
    const id = target.dataset.id as string
    currentRequisite = requisites.find(req => req.id === id)
  } */

  async function copyRequisite(name: string) {
    try {
      await navigator.clipboard.writeText(`elems.${name}`);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  function click(e: Event) {
    e.preventDefault()
  }
  
</script>

<div class="flex flex-col">
{#each requisites as requisite}
  {@const selected = requisite.id === currentRequisite?.id}
  <div class={`relative px-4 py-2
    ${selected ? 'bg-gray-300' : ''}`}>
    <!--
      <div onclick={() => copyRequisite(requisite.name)} class='mb-2'>
    -->
    <div
      class='mb-2 cursor-pointer text-gray-900 font-medium hover:text-black'
      onclick={selectRequisite}
      data-id={requisite.id}>
      {requisite.name} {requisite.id}
    </div>
    <input
      bind:this={inputs[requisite.name]}
      class={`rounded border-2 border-solid mb-5 w-full py-1 pl-2 border-gray-700`}
      name={requisite.name}
      type={requisite.settings.type}
      data-id={requisite.id}
      value={requisite.title}
      autocomplete="off"
      oninput={input}
      onchange={change}
      onclick={click}
    />
    {#if selected}
      <div class="absolute top-[50%] right-0 -translate-y-[50%]
        border-r-[10px] border-r-white border-t-[10px] border-b-[10px]
        border-l-0 border-transparent border-solid"></div>
    {/if}
  </div>
{/each}
</div>