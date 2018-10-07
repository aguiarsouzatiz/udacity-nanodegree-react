const requestUnsplash = new XMLHttpRequest();
const searchForText = getElementBy('#search-text').value || 'sea'

// const apiCredentials = [
  // {key: 'unsplash'},
  // {key: 'nytimes'},
// ]

function setTimeValueBy(time) {
  return {'1-minute': 60, '10-minutes': 60 * 10, 'one-hour': 60 * 60, 'one-day': 60 * 60 * 24 }[time]
}

function getCookieExpiredTime(time='one-day') {
  const now = new Date()
  now.setTime(now.getTime() + 1 * setTimeValueBy(time) * 1000 )
  return now.toGMTString()
}

document.addEventListener('DOMContentLoaded', function() {
  const targets = getEachElementsWith('[data-event="set-keys"]')
  // apiCredentials.forEach(({key}) => console.log(key))

  targets.forEach(target => {
    const key = target.dataset.target
    const input = getElementBy(`[data-input="${key}"]`)
    // console.log(input);

    if (localStorage.getItem(key)) input.value = localStorage.getItem(key)
  })

  targets.forEach(target => target.addEventListener('click', function() {
    const key = target.dataset.target
    const input = getElementBy(`[data-input="${key}"]`)
    const accessKey = input.value
    console.log(input)
    localStorage.setItem(key, accessKey)
  }))

})

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
  return localStorage.getItem(apiName) || getElementBy(`[data-input="${apiName}"]`).value
}

requestUnsplash.open('GET', `https://api.unsplash.com/search/photos?page=1&query=city`)
requestUnsplash.onload = showResponse
const accessKey = getAccessKeyOf('unsplash')
console.log(getAccessKeyOf('unsplash'))
console.log(getAccessKeyOf('nytimes'))
requestUnsplash.setRequestHeader('Authorization', `Client-ID ${accessKey}`)
// requestUnsplash.send()