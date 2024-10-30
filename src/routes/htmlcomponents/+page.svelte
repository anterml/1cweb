<script lang="ts">
  import Button from './button.svelte'
</script>
<div>
  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
  <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
  <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>
  <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>
  <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
  <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
  <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
  <button type="button" class="rounded-secondary focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
  <Button name="primary">primary</Button>
  <Button name="secondary">secondary</Button>

  <div class="accent">
    <h2>Hello accent</h2>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
  </div>

  <div class="layer">
    <h2>default</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem rerum necessitatibus delectus accusamus quisquam praesentium quaerat quis, distinctio nobis illum cumque maiores magnam sapiente aperiam incidunt in placeat quasi a?</p>
    <button>Load</button>
  </div>

  <div class="layer layer-red">
    <h2>red</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem rerum necessitatibus delectus accusamus quisquam praesentium quaerat quis, distinctio nobis illum cumque maiores magnam sapiente aperiam incidunt in placeat quasi a?</p>
    <button>Load</button>
  </div>

  <div class="layer layer-black">
    <h2>black</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem rerum necessitatibus delectus accusamus quisquam praesentium quaerat quis, distinctio nobis illum cumque maiores magnam sapiente aperiam incidunt in placeat quasi a?</p>
    <button>Load</button>
  </div>

  <div>
    
  </div>
</div>

<style>
  .layer {
    --my-text-color: blue;
    --my-bg-color: gray;
    margin-bottom: 20px;
    padding: 10px 20px;
  }

  .layer-red {
    --my-text-color: red;
    --my-bg-color: white;
  }

  .layer-black {
    --my-text-color: grey;
    --my-bg-color: black;
  }

  .layer {
    h2 {
      font-weight: bold;
      color: var(--my-text-color);
    }

    button {
      color: var(--my-text-color);
      background-color: var(--my-bg-color);
      padding: 4px 8px;
    }

    p {
      width: 300px;
      border: 1px solid var(--my-text-color);
      color: black;
    }
  }
</style>