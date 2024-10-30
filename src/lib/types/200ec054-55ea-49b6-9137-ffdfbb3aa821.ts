export const onforminput: OnFormInput = {
  observeFields: ["Количество", "Цена"],
  handle(currentInput, inputs, triggerInput) {
    if(triggerInput === inputs.Количество) {
      
    }
    const a = Number(inputs.Количество.value) || 0
    const b = Number(inputs.Цена.value) || 0
    //currentInput.value = String(a * b)
    const result = a + b

    currentInput.style.color = result > 50 ? "green" : ''
    
    return result
  }
}