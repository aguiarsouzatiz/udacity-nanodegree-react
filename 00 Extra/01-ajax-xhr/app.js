
function setTimeValueBy(time='one-day') {
  return {'1-minute': 60, '10-minutes': 60 * 10, 'one-hour': 60 * 60, 'one-day': 60 * 60 * 24 }[time]
}

function getCookieExpiredTime(time) {
  const now = new Date()
  now.setTime(now.getTime() + 1 * setTimeValueBy(time) * 1000 )
  return now.toGMTString()
}

function getCookieWith(key) {
  const cookies = document.cookie.split(';')
  return cookies.find(cookie => cookie.includes(key)).trim()
}

function extactContentOf(cookie) {
   const [ key, value ] = cookie.split('\=')
   return { key, value }
}

function setDefaultCookieValueIn(inputTarget) {
  const key = inputTarget.dataset.target
  const input = getElementBy(`[data-input="${key}"]`)
  const targetCookie = extactContentOf(getCookieWith(key))

  if (targetCookie) input.value = targetCookie.value
}

function setCookieValueFrom(inputTarget) {
  return function() {
    const key = inputTarget.dataset.target
    const input = getElementBy(`[data-input="${key}"]`)
    const accessKey = input.value

    document.cookie = `${key}=${accessKey};expires=${getCookieExpiredTime("one-day")};`
  }
}

function applyEventToStoreCookieFrom(inputTarget) {
  inputTarget.addEventListener('click', setCookieValueFrom(inputTarget))
}

function handleCookieEventsIn(inputTargets) {
  inputTargets.forEach(input => {
    setDefaultCookieValueIn(input)
    applyEventToStoreCookieFrom(input)
  })
}

function getElementBy(targetReference) {
  return document.querySelector(targetReference)
}

function getEachElementsWith(targetsReference) {
  return Array.from(document.querySelectorAll(targetsReference))
}

function getAccessKeyOf(apiName) {
  return {
    'unsplash': handleStorageOfAccessKey('unsplash'),
    'nytimes': handleStorageOfAccessKey('nytimes')
  }[apiName]
}

function handleStorageOfAccessKey(apiName) {
  return extactContentOf(getCookieWith(apiName)).value || getElementBy(`[data-input="${apiName}"]`).value
}

function setImageResultHTMLTemplateBy(url) {
  return `<figure>
            <img src="${url}">
          </figure>`
}

function renderResults(event) {
  const placeToInjectResults = getElementBy('[data-inject="search-results"]')
  const data = JSON.parse(event.target.responseText)
  data.results.forEach(({urls}) => {
    const htmlContent = setImageResultHTMLTemplateBy(urls.thumb)
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent)
  })
}

function makeRequestTo(textToSearch) {
  const requestUnsplash = new XMLHttpRequest();
  requestUnsplash.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${textToSearch}`)
  requestUnsplash.setRequestHeader('Authorization', `Client-ID ${getAccessKeyOf('unsplash')}`)
  requestUnsplash.onload = renderResults
  requestUnsplash.send()
}

function searchInput(event) {
  const textToSearch = getElementBy('[data-input="search-text"]').value.trim()
  if (textToSearch) makeRequestTo(textToSearch)
}

function conditionalSearch(event) {
	if (event.keyCode === 13) searchInput(event)
}

function getActionsToHTMLElements() {
  return [
    { target: getElementBy('[data-event="search-submit"]'),  event: 'click', action: searchInput },
    { target: document,  event: 'keyup', action: conditionalSearch }
  ]
}

getActionsToHTMLElements().forEach(({ target, event, action }) => {
  target.addEventListener(event, action)
})

document.addEventListener('DOMContentLoaded', function() {
  const inputTargets = getEachElementsWith('[data-event="set-keys"]')

  handleCookieEventsIn(inputTargets)
})