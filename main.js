import { toast } from 'https://cdn.skypack.dev/wc-toast' // para sacar un popup de aviso
import '@picocss/pico/css/pico.min.css'
import countries from './countries.json'
import { $, setInitialDate, calcHeight } from './utils.js'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'

polyfillCountryFlagEmojis()

function changeTimeZone (date, timeZone) {
  const dateToUse = typeof date === 'string' ? new Date(date) : date
  return new Date(dateToUse.toLocaleString('es-ES', { timeZone }))
}

// const transformDateToString = (date) => {
function transformDateToString (date) {
  return date.toLocaleString('es-ES', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })
}

const $textArea = $('textarea')

$('form').addEventListener('submit', event => {
  event.preventDefault()
  // El FormData crea un array de arrays con los inputs del form. Cada array tiene el nombre y el valor del input
  // El fromEntries transforma ese array de arrays a un objeto JSON
  const data = Object.fromEntries(new window.FormData(event.target))
  const fechaPrincipal = new Date(data.fecha)

  const paises = []

  countries.forEach(country => {
    // Estos corchetes cogen el primer elemento del array timezones
    const [timeZone] = country.timezones
    const timeInTimeZone = changeTimeZone(fechaPrincipal, timeZone)
    const pais = { name: country.name, emoji: country.emoji, time: timeInTimeZone }
    paises.push(pais)
  })

  paises.sort((a, b) => { return b.time - a.time })

  const html = paises.map(pais => {
    const { name, emoji, time } = pais
    return `${name} ${emoji} ${transformDateToString(time)}`
  }).join('\n')

  // Copia al portapapeles el texto y sacamos popup de aviso
  navigator.clipboard.writeText(html).then(() => {
    toast('¡Copiado al portapeles!', {
      icon: {
        type: 'success'
      }
    })
  })

  $textArea.value = html
  $textArea.style.height = calcHeight($textArea.value) + 'px'
})

setInitialDate()
