function createOnlyNumberInputs() {
  let store = $state<string[]>([])
  return {
    get value() { return store },
    set value(value: string[]) { store = value }
  }
}

export const onlyNumberInputs = createOnlyNumberInputs()