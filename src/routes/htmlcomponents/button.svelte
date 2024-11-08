<script lang="ts">
  import type { Snippet } from "svelte"
  type Props = { name: "primary" | "secondary", children: Snippet }
  let { name, children }: Props = $props()
</script>

<button style={`
  --button-color: var(--main-color-${name});
  --button-bgcolor: var(--main-bgcolor-${name});`}>
  {@render children()}
</button>

<style>
  button {
    color: var(--button-color);
    background-color: var(--button-bgcolor);
    padding: var(--main-px);
  }
</style>