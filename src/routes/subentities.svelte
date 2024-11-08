<script lang="ts">
  import type { EntityKeys } from '$lib/types/entity'
  let { currentEntity }: { currentEntity: EntityKeys } = $props()

  const subentities: Record<EntityKeys, string[]> = {
    'Документы': ['Реквизиты', 'Табличные части', 'Формы'],
    'Справочники': ['Реквизиты', 'Табличные части', 'Формы', 'Команды'],
  }
</script>

<div class="line">
  <div class="py-1 py-2">Свойства</div>
  {#each subentities[currentEntity] as entity}
    <div>{entity}</div>
  {/each}
</div>