// Creamos una variable '$' con la función documento.querySelector, lo que viene a ser algo parecido a tener JQuery
export const $ = selector => document.querySelector(selector)

export const setInitialDate = () => {
  // Inicializamos a la fecha actual el input
  const now = new Date()
  const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 16)
  $('input').value = iso
}

export function calcHeight (value) {
  const numberOfLineBreaks = (value.match(/\n/g) || []).length
  // min-height + lines x line-height + padding + border
  const newHeight = 20 + numberOfLineBreaks * 33 + 12 + 2
  return newHeight
}
