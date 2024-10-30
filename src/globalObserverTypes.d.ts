declare global {
  type SelectedInputs = Inputs
  type OnFormInput = {
    observeFields: InputName[],
    handle(currentInput: Input, inputs: SelectedInputs, triggerInput: Input): void,
  }
}
export {}