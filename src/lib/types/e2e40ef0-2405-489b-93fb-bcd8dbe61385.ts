export const onforminput: OnFormInput = {
  observeFields: ['Наименование'],
  handle(currentInput, inputs, triggerInput) {
    return triggerInput.value.toUpperCase()
  }
}