<script lang="ts">
  import type { Snippet } from "svelte"
  type Props = { name: "primary" | "secondary", children: Snippet }
  let { name, children }: Props = $props()
</script>

<button style={`
  --button-color: var(--my-color-${name});
  --button-bgcolor: var(--my-bgcolor-${name});`
}>
  {@render children()}
</button>

<style>
  button {
    color: var(--button-color, 'blue');
    background-color: var(--button-bgcolor, 'green');
    padding: var(--my-px)
  }
</style>