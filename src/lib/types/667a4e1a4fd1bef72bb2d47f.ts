export const onforminput: OnFormInput = {
  observeFields: ["Количество", "Цена"],
  handle(currentInput, inputs, triggerInput) {
    const nonPositiveNumber = Object.values(inputs).find(elem => elem.value === '')
    if(nonPositiveNumber)
      return "";
    const a = Number(inputs.Количество.value) || 0
    const b = Number(inputs.Цена.value) || 0
    //currentInput.value = String(a * b)
    const result = a * b

    currentInput.style.color = result > 70 ? "green" : ''
    currentInput.style.border = result > 70 ? "2px solid red": ""
    return result;
  }
}