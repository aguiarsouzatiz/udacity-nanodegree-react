function getAccessKeyOf(apiName) {
  return {
    'unsplash': handleStorageOfAccessKey('unsplash'),
    'nytimes': handleStorageOfAccessKey('nytimes')
  }[apiName]
}

function handleStorageOfAccessKey(apiName) {
  return extractContentOf(getCookieWith(apiName)).value || getElementBy(`[data-input="${apiName}"]`).value
}