export const onforminput: OnFormInput = {
  observeFields: ['Наименование'],
  handle(currentInput, inputs, triggerInput) {
    return triggerInput.value.toUpperCase()
  }
}

/* type Inp = Omit<HTMLInputElement, 'value'> & { readonly value: string }
export function efonchange(current: Inp, inputs: Inputs) {
    // @ts-ignore
    current.value = '10'
    return 10 + 10
}
 */