<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api'

  const { fileName }: { fileName: string } = $props()

  let editor: Monaco.editor.IStandaloneCodeEditor
  let monaco: typeof Monaco
  let editorContainer: HTMLElement

  const loadStaticCode = async (libName: string): Promise<string> => {
    if(!libName)
      return ""
    try {
      const response = await fetch(`/api/static-code?fileName=${libName}`)
      const code = await response.text()
      return code
    } catch(e) {
      console.log("Can't to load a handler file")
    }

    return ""
  }

  $effect(() => {
    if(fileName && editor) {
      loadStaticCode(fileName).then(value => {
        editor.setValue(value)
      })
    }
  })

  onMount(async () => {
    // Import our 'monaco.ts' file here
    // (onMount() will only be executed in the browser, which is what we want)
    monaco = (await import('./monaco')).default

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      //typeRoots: ["types"],
      //noLib: true,
      //lib: ['ESNext']
      //rootDir: "$lib/"
    })

    const code = await loadStaticCode(fileName)
    editor = monaco.editor.create(editorContainer, {
      minimap: {
        enabled: false
      }
    })
    

    const model = monaco.editor.createModel(code, 'typescript')
    editor.setModel(model)
    //console.log('uid', crypto.randomUUID())
  })

  function check() {
    setInterval(() => {
      
      console.log('focus', editor.hasTextFocus())
    },3000)
  }

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose())
    editor?.dispose()
  })

  async function saveEditorCode() {
    const code = editor.getValue()
    await fetch(`/api/static-code?fileName=${fileName}`, {
      method: "POST",
      body: code,
    })
  }

  async function updateEditorCode() {
    const code = await loadStaticCode(fileName)
    editor.setValue(code)
  }
</script>



<div class="flex flex-col">
  <div>id {fileName} <button onclick={check}>chekc focus ++</button></div>
  <div class="px-8">
    <button class='px-2 py-0.5 rounded border-solid border-black border mr-2 my-3' onclick={updateEditorCode}>Update</button>
    <button class='px-2 py-0.5 rounded border-solid border-black border' onclick={saveEditorCode}>Save</button>
  </div>
  <div class="container flex-auto border-1 border-solid border-gray-500" bind:this={editorContainer}></div>
</div>


