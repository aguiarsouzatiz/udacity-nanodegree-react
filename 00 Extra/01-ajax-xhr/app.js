
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
  const foundKeyCookie = cookies.find(cookie => cookie.includes(key))
  if (foundKeyCookie) return foundKeyCookie.trim()
}

function extactContentOf(hasCookie) {
  if (hasCookie) {
    const [ key, value ] = hasCookie.split('\=')
    return { key, value }
  }
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

function setArticleResultHTMLTemplateBy({snippet, web_url}) {
  return `<div class="bx--margin-bottom-xs">
            <p>${snippet}</p>
            <footer>
              <a class="bx--link" href="${web_url}">Read the article</a>
            </footer>
          </div>`
}

function setLoadingHTMLTemplate() {
  return `<div class="bx--loading-overlay">
            <div data-loading class="bx--loading">
              <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                <title>Loading</title>
                <circle cx="0" cy="0" r="37.5" />
              </svg>
            </div>
          </div>`
}

function removePreviousResultsOf(element) {
  return element.innerHTML = ''
}

function setLoadingStateIn(element) {
  removePreviousResultsOf(element)
  return element.insertAdjacentHTML('afterbegin', setLoadingHTMLTemplate())
}

function renderResultsUnsplash(event) {
  const placeToInjectResults = getElementBy('[data-inject="image-results"]')
  setLoadingStateIn(placeToInjectResults)

  const data = JSON.parse(event.target.responseText)
  removePreviousResultsOf(placeToInjectResults)

  data.results.forEach(({urls}) => {
    const htmlContent = setImageResultHTMLTemplateBy(urls.thumb)
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent)
  })
}

function renderResultsNY(event) {
  const placeToInjectResults = getElementBy('[data-inject="article-results"]')
  setLoadingStateIn(placeToInjectResults)

  const data = JSON.parse(event.target.responseText)
  removePreviousResultsOf(placeToInjectResults)

  data.response.docs.forEach(data => {
    const htmlContent = setArticleResultHTMLTemplateBy(data)
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent)
  })
}

function makeRequestUnsplash(textToSearch) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${textToSearch}`)
  request.setRequestHeader('Authorization', `Client-ID ${getAccessKeyOf('unsplash')}`)
  request.onload = renderResultsUnsplash
  request.send()
}

function makeRequestNY(textToSearch) {
  const request = new XMLHttpRequest();
  request.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${textToSearch}&api-key=${getAccessKeyOf('nytimes')}`)
  request.onload = renderResultsNY
  request.send()
}

function searchInput(event) {
  const textToSearch = getElementBy('[data-input="search-text"]').value.trim()
  if (textToSearch) {
    makeRequestUnsplash(textToSearch)
    makeRequestNY(textToSearch)
  }
}

function conditionalSearch(event) {
	if (event.keyCode === 13) searchInput(event)
}

function setActionsToHTMLElements() {
  return [
    { target: getElementBy('[data-event="search-submit"]'),  event: 'click', action: searchInput },
    { target: document,  event: 'keyup', action: conditionalSearch }
  ]
}

setActionsToHTMLElements().forEach(({ target, event, action }) => {
  target.addEventListener(event, action)
})

document.addEventListener('DOMContentLoaded', function() {
  const inputTargets = getEachElementsWith('[data-event="set-keys"]')

  handleCookieEventsIn(inputTargets)
})