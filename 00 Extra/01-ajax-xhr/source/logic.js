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