function extractByPropertyResponseDocs(data) {
  return data.response.docs
}

function extractByPropertyResults(data) {
  return data.results
}

function parseToJSON(requestData) {
  return JSON.parse(requestData.responseText)
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

function getRequestReferencesOf(apiName) {
  return { toFind: function(textToSearch) {
      return {
        'nytimes': { url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${textToSearch}&api-key=${getAccessKeyOf('nytimes')}`, hasHeader: false },
        'unsplash': { url: `https://api.unsplash.com/search/photos?page=1&query=${textToSearch}`, hasHeader: `Client-ID ${getAccessKeyOf('unsplash')}` }
      }[apiName]
    }
  }
}