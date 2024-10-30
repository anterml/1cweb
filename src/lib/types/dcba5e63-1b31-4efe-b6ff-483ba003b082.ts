export function onchange(elem: HTMLInputElement, elems: Elems) {
  const first = Number(elem.value) || 0
  const second = Number(elems.Количество.value) || 0
  //console.log(first, second, first * second)
  //elems.Сумма.value = String(first * second)
}

export function validate(value: string) {
  return Number(value) >= 0
}