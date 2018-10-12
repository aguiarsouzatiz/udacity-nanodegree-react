function getAccessKeyOf(apiName) {
  return {
    'unsplash': handleStorageOfAccessKey('unsplash'),
    'nytimes': handleStorageOfAccessKey('nytimes')
  }[apiName]
}

function handleStorageOfAccessKey(apiName) {
  return extarctContentOf(getCookieWith(apiName)).value || getElementBy(`[data-input="${apiName}"]`).value
}