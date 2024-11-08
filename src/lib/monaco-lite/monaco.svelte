<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api'
  import { editorInjectData } from '$lib/stores/editorInjectData.svelte'
  import { onlyNumberInputs } from '$lib/stores/onlyNumberInputs.svelte'
  import registerCompletionItemProvider from './registerCompletionItemProvider'
  import type { Requisite } from '$lib/constants/settings'

  type Props = {
    requisite: Requisite
  }

  const { requisite }: Props = $props()

  let editor: Monaco.editor.IStandaloneCodeEditor
  let monaco: typeof Monaco
  let editorContainer: HTMLElement

  const loadStaticCode = async (fileName: string): Promise<string> => {
    if(!fileName)
      return ""
    try {
      const response = await fetch(`/api/static-code?fileName=${fileName}`)
      const code = await response.text()
      return code
    } catch(e) {
      console.log("Can't to load a handler file")
    }

    return ""
  }

  const loadGlobalCode = async (fileName: string): Promise<string> => {
    if(!fileName)
      return ""
    try {
      const response = await fetch(`/api/global?fileName=${fileName}`)
      const code = await response.text()
      return code
    } catch(e) {
      console.log("Can't to load a handler file")
    }

    return ""
  }

  let prevModuleName: string = requisite.id

  type LoadedModule = {
    [name: string]: {
      changed: boolean,
    },
  }

  let loadedModules = $state<LoadedModule>({})
  let modulesCode: Record<string, string> = {}

  $effect(() => {
    if(requisite.id && editor) {
      if(requisite.id !== prevModuleName && loadedModules[prevModuleName]) {
        modulesCode[prevModuleName] = editor.getValue().replace('file:///src/lib', '$lib')
      }

      if(loadedModules[requisite.id]) {
        editor.setValue(modulesCode[requisite.id].replace('$lib', 'file:///src/lib'))
        injectObserveFields(editor.getValue())
        prevModuleName = requisite.id
      } else {
        loadStaticCode(requisite.id).then(data => {
          loadedModules[requisite.id] = {
            changed: false,
          }
          modulesCode[requisite.id] = data
        })
      }
    }
  })

  $effect(() => {
    const id = requisite.id
    if(editor && loadedModules[id]) {
      if(registerCompletion)
        registerCompletion.value.dispose()
      registerCompletion = {
        type: 'input',
        value: monaco.languages.registerCompletionItemProvider(
          'typescript',
          registerCompletionItemProvider(monaco, 'input')
        )
      }
    }
  })

  let registerCompletion: {
    type: 'input' | 'button' | 'select' | 'checkbox',
    value: Monaco.IDisposable,
  }

  onMount(async () => {
    monaco = (await import('./monaco')).default

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
    })

    const value = editorInjectData.value
    const onlyNumbers = onlyNumberInputs.value
    getExtraLib(value, onlyNumbers)

    const globalCode = await loadGlobalCode('base')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(globalCode, 'file:///src/lib/snippets/base.ts')
    
    const code = await loadStaticCode(requisite.id) || ""
    injectObserveFields(code)

    registerCompletion = {
      type: 'input',
      value: monaco.languages.registerCompletionItemProvider(
        'typescript',
        registerCompletionItemProvider(monaco, 'input')
      )
    }
    
    loadedModules[requisite.id] = {
      changed: false,
    }

    modulesCode[requisite.id] = code

    editor = monaco.editor.create(editorContainer, {
      //lineNumbers: 10,
      theme: "vs-dark",
      minimap: {
        enabled: false
      }
    })

    const model = monaco.editor.createModel(code.replace('$lib', 'file:///src/lib'), 'typescript')
    editor.setModel(model)

    model.onDidChangeContent(event => {
      if(requisite.id === prevModuleName) {
        loadedModules[requisite.id].changed = true
        injectObserveFields(editor.getValue())
      }
    })
  })

  function injectObserveFields(code: string) {
    const match = code.match(/.+observeFields\:\s*\[([^\]]+)\].+/)
    const value = match && match[1]
      ? match[1].replace(/\s*,\s*/g, " | ")
      : ''

    addOnFormInputExtraLib(value)
  }

  function addOnFormInputExtraLib(value?: string) {
    const text = `
      declare global {
        type SelectedInputs = ${!value ? 'Inputs' : `Pick<Inputs, ${value}>`}
        type OnFormInput = {
          observeFields: InputName[],
          handle(currentInput: Input, inputs: SelectedInputs, triggerInput: Input): void,
        }
      }
      export {}
    `
    
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      text,
      'file:///src/globalObserverTypes.d.ts'
    )
  }


  function getExtraLib(value: string[], onlyNumbers: string[]) {
    const inputNames = value.map(name => `'${name}'`).join(" | ")
    const onlyNumberNames = onlyNumbers.map(name => `'${name}'`).join(" | ")
    if(monaco) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare global {
          type EK = "Справочники" | "Документы"
          type InputName = ${inputNames}
          type OnlyNumberName = ${onlyNumberNames}
          type Input = HTMLInputElement & { readonly value: string }
          type Inputs = Record<InputName, Input>
        }
        export {}`,
        'file:///src/record.d.ts'
      )
    }
  }

  $effect(() => {
    const value = editorInjectData.value
    const onlyNumbers = onlyNumberInputs.value
    getExtraLib(value, onlyNumbers)
  })

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose())
    editor?.dispose()
  })

  async function saveEditorCode() {
    const code = editor.getValue().replace('file:///src/lib', '$lib')

    await fetch(`/api/static-code?fileName=${requisite.id}`, {
      method: "POST",
      body: code,
    })

    if(loadedModules[requisite.id])
      loadedModules[requisite.id].changed = false
  }

  async function updateEditorCode() {
    const code = await loadStaticCode(requisite.id)
    const loadedModule = loadedModules[requisite.id]
    if(loadedModule) {
      editor.setValue(code.replace('$lib', 'file:///src/lib'))
      loadedModule.changed = false
      modulesCode[requisite.id] = code
    }
  }
</script>



<div class="flex flex-col flex-auto">
  <div>id {requisite.id} <button onclick={() => registerCompletion && registerCompletion.value.dispose()}>dispose</div>
  <div>name {requisite.name}</div>
  <div class="px-8">
    <button class='px-2 py-0.5 rounded border-solid border-black border mr-2 my-3' onclick={() => { editor.setPosition({lineNumber: 3, column: 5}); editor.focus()}}>cursor</button>
    <button class='px-2 py-0.5 rounded border-solid border-black border mr-2 my-3' onclick={updateEditorCode}>Update</button>
    <button
      class='px-2 py-0.5 rounded border-solid border-black border text-red-500 disabled:text-gray-400'
      disabled={!loadedModules[requisite.id]?.changed}
      onclick={saveEditorCode}>
      Сохранить
  </button>
  </div>
  <div class="container flex-auto border-1 border-solid border-gray-500" bind:this={editorContainer}></div>
</div>


