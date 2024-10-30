<script lang="ts">
  let { currentEntity }: { currentEntity: EntityKeys } = $props()

  const subentities: Record<EntityKeys, string[]> = {
    'Документы': ['Реквизиты', 'Табличные части', 'Формы'],
    'Справочники': ['Реквизиты', 'Табличные части', 'Формы', 'Команды'],
  }
</script>

<div>
  {subentities[currentEntity].join(",")}
</div>