export function onchange(elem: HTMLInputElement, elems: Elems) {
  const a = Number(elem.value) || 0
  const b = Number(elems.Цена.value) || 0
  //elems.Сумма.value = String(a * b)
}