function createSubentityUrl() {
  let store = $state<string>('requisites')
  return {
    get value() { return store },
    set value(value: string) { store = value }
  }
}

export const subentityUrl = createSubentityUrl()