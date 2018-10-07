

// const apiCredentials = [
  // {key: 'unsplash'},
  // {key: 'nytimes'},
// ]

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

function showResponse(event) {
  console.log(event)
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

const requestUnsplash = new XMLHttpRequest();
const searchForText = getElementBy('#search-text').value || ''

requestUnsplash.open('GET', `https://api.unsplash.com/search/photos?page=1&query=city`)
requestUnsplash.onload = showResponse
const accessKey = getAccessKeyOf('unsplash')
requestUnsplash.setRequestHeader('Authorization', `Client-ID ${accessKey}`)
// requestUnsplash.send()

document.addEventListener('DOMContentLoaded', function() {
  const inputTargets = getEachElementsWith('[data-event="set-keys"]')

  handleCookieEventsIn(inputTargets)
})