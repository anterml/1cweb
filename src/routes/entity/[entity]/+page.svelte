<script lang="ts">
    import { page } from "$app/stores";

    $effect(() => {
      console.log('page', $page.url)
    })
</script>

<div>entity </div>