
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

function extarctContentOf(hasCookie) {
  if (hasCookie) {
    const [ key, value ] = hasCookie.split('\=')
    return { key, value }
  }
}

function setDefaultCookieValueIn(inputTarget) {
  const key = inputTarget.dataset.target
  const input = getElementBy(`[data-input="${key}"]`)
  const targetCookie = extarctContentOf(getCookieWith(key))

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
  return extarctContentOf(getCookieWith(apiName)).value || getElementBy(`[data-input="${apiName}"]`).value
}

function setImageResultHTMLTemplateBy({urls}) {
  return `<figure>
            <img src="${urls.thumb}">
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
  return `<div class="bx--loading-overlay" data-inject="loading">
            <div data-loading class="bx--loading">
              <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                <title>Loading</title>
                <circle cx="0" cy="0" r="37.5" />
              </svg>
            </div>
          </div>`
}

function setHTMLTemplateOf(apiName) {
  return {
    'nytimes': setArticleResultHTMLTemplateBy,
    'unsplash': setImageResultHTMLTemplateBy
  }[apiName]
}

function removePreviousResultsOf(element) {
  return element.innerHTML = ''
}

function makeSearchRequestFrom(apiName, textToSearch) {
  return new Promise((resolve, reject) => {
    const { url, hasHeader } = getRequestReferencesOf(apiName).toFind(textToSearch)
    const requestApi = new XMLHttpRequest()

    requestApi.open('GET', url)
    if (hasHeader) requestApi.setRequestHeader('Authorization', `${hasHeader}`)
    requestApi.onload = (event) => resolve(parseToJSON(event.target))
    requestApi.send()
  })
}

function renderResultsOf(dataRequest, apiName, place) {
  const placeToInjectResults = getElementBy(`[data-inject="${place}"]`)
  const dataResponse = extractArrayFrom(apiName)(dataRequest)
  removePreviousResultsOf(placeToInjectResults)

  dataResponse.forEach(data => {
    const template = setHTMLTemplateOf(apiName)
    const htmlContent = template(data)
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent)
  })
}

function extractArrayFrom(apiName) {
  return {
    'nytimes': extractByPropertyResponseDocs,
    'unsplash': extractByPropertyResults
  }[apiName]
}

function extractByPropertyResponseDocs(data) {
  return data.response.docs
}

function extractByPropertyResults(data) {
  return data.results
}

function parseToJSON(requestData) {
  return JSON.parse(requestData.responseText)
}

function searchInput(event) {
  const place = getElementBy('[data-inject="search-results"]')
  place.insertAdjacentHTML('afterbegin', setLoadingHTMLTemplate())

  const textToSearch = getElementBy('[data-input="search-text"]').value.trim()
  if (textToSearch) {
    const loading = place.querySelector('[data-inject="loading"]')
    Promise.all([
      makeSearchRequestFrom('nytimes', textToSearch),
      makeSearchRequestFrom('unsplash', textToSearch)
    ]).then(([nytimes, unsplash]) => {
      renderResultsOf(nytimes, 'nytimes', 'article-results')
      renderResultsOf(unsplash, 'unsplash', 'image-results')
      loading.remove()
    })
  }
}

function conditionalSearch(event) {
	if (event.keyCode === 13) searchInput(event)
}

function getRequestReferencesOf(apiName) {
  return { toFind: function(textToSearch) {
      return {
        'nytimes': { url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${textToSearch}&api-key=${getAccessKeyOf('nytimes')}`, hasHeader: false },
        'unsplash': { url: `https://api.unsplash.com/search/photos?page=1&query=${textToSearch}`, hasHeader: `Client-ID ${getAccessKeyOf('unsplash')}` }
      }[apiName]
    }
  }
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