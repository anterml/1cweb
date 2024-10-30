declare global {
  type EK = "Справочники" | "Документы"
  type InputName = string
  type Input = HTMLInputElement & { readonly value: string }
  type Inputs = Record<InputName, Input>
}
export {}