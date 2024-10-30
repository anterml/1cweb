<!-- <script lang="ts" generics="T"> -->
<script lang="ts" >
  import { blue } from '$lib/components/views/select/main'
  import type { Snippet } from 'svelte'

  type Props = {
    children: Snippet,
    onchange: (e: Event) => void
  }
  
  let { children, onchange }: Props = $props()
</script>

<select {onchange} class={blue}>
  {@render children()}
</select>
