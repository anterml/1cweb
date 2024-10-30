<script lang="ts">
  import type { Requisite, Setting } from "$lib/constants/settings"
  import { page } from "$app/stores"
  import Select from '$lib/components/elements/select.svelte'

  import type { PageStateNewRequisite } from "./types"

  type Props = {
    requisite: Requisite,
  }

  let { requisite }: Props = $props()
  let inputName = $state<HTMLInputElement>()

  const settings: Setting[] = [
    { name: "Строка", type: 'text', len: 50 },
    { name: "Число", type: 'number', len: 10, precision: 0, negative: false },
    { name: "Чекбокс", type: 'checkbox', enabled: false },
  ]

  $effect(() => {
    const { newRequisite } = $page.state as PageStateNewRequisite
    const isNewRequisite = newRequisite && newRequisite.id === requisite.id && newRequisite.name === requisite.name
    if(inputName && isNewRequisite) {
      inputName.focus()
      inputName.select()
    }
  })

  const requisitesBackup = []

  function onchangeSelect(e: Event) {
    const target = e.target as HTMLSelectElement
    const value = target.value as Setting['type']
    const setting = settings.find(setting => setting.type === value)

    if(setting) {
      console.log('requisite', requisite)
      requisite = {
        ...requisite,
        settings: setting
      }
      console.log('requisite2', requisite)
    }
  }



  $inspect($page.state)
</script>

<div class='grid grid-cols-[auto_auto] gap-4 container-padding scroll-y justify-items-start'>
  <span class='columns-1'>Название</span>
  <input bind:this={inputName} class="input input-primary columns-2" bind:value={requisite.name} />

  <span class='columns-1'>Тип</span>
  <div class="columns-2">
    <Select onchange={onchangeSelect}>
      {#each settings as setting}
        <option value={setting.type} selected={setting.type === requisite.settings.type}>
          {setting.name}
        </option>
      {/each}
    </Select>
  </div>

  {#if 'len' in requisite.settings}
    <span class='columns-1'>Длина</span>
    <label class='columns-2'>
      <input
        class='input input-primary'
        value={requisite.settings.len}
        onchange={(e) => {
          if(requisite.settings.type === 'number')
            requisite.settings.len = Number((e.target as HTMLInputElement).value)
        }}/>
    </label>
  {/if}

  {#if 'negative' in requisite.settings }
    <span class='columns-1'>Отрицательное</span>
    <input class="columns-2 " type='checkbox' />
  {/if}
</div>