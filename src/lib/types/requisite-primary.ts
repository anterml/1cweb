export default function handle(value: HTMLInputElement['value']) {
  return isValid(convertToNumber(value))
}

function convertToNumber(value: string) {
  return parseInt(value)
}

function isValid(value: number) {
  return value > 100 ? 100 : value
}

export function onclick(elem: HTMLInputElement) {
  console.log('elem type', elem.type)
}