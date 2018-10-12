function getElementBy(targetReference) {
  return document.querySelector(targetReference)
}

function getEachElementsWith(targetsReference) {
  return Array.from(document.querySelectorAll(targetsReference))
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

function conditionalSearch(event) {
	if (event.keyCode === 13) searchInput(event)
}

function removeLoadingStateElementIn(place) {
  const loading = place.querySelector('[data-inject="loading"]')
  return loading.remove()
}

function applyLoadingStateElementIn(place) {
  return place.insertAdjacentHTML('afterbegin', setLoadingHTMLTemplate())
}