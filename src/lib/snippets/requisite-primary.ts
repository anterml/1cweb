export default function handle(value: HTMLInputElement['value']) {
  return isValid(convertToNumber(value))
}

function convertToNumber(value: string) {
  return parseInt(value)
}

const MAX_NUMBER = 100
function isValid(value: number) {
  return value > MAX_NUMBER ? MAX_NUMBER : value
}

export function onclick(elem: HTMLInputElement) {
  alert(`Выбран тип: ${elem.type}`)
}