function createEditorInjectData() {
  let store = $state<string[]>([])
  return {
    get value() { return store },
    set value(value: string[]) { store = value }
  }
}

export const editorInjectData = createEditorInjectData()