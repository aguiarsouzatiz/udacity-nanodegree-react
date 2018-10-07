const requestUnsplash = new XMLHttpRequest();
const searchForText = getElementBy('#search-text').value || 'sea'

document.addEventListener('DOMContentLoaded', function() {
  const target = getElementBy('#access-key')
  const storedKey = localStorage.getItem('unsplash')
  console.dir(target)
  console.log(storedKey)
  target.value = storedKey
  console.log(target)

})

console.log(searchForText);

function showResponse(event) {
  console.log(event)
}

function getElementBy(targetReference) {
  return document.querySelector(targetReference)
}

function getAccessKeyOf(apiName) {
  return {
    'unsplash': getElementBy('#access-key').value || localStorage.getItem('unsplash')
  }[apiName]
}

function setKeys() {
  const accessKey = getAccessKeyOf('unsplash')
  console.log('hey');
  localStorage.setItem('unsplash', accessKey)
}

requestUnsplash.open('GET', `https://api.unsplash.com/search/photos?page=1&query=city`)
requestUnsplash.onload = showResponse
const accessKey = getAccessKeyOf('unsplash')
console.log('accessKey', accessKey)
requestUnsplash.setRequestHeader('Authorization', `Client-ID ${accessKey}`)
requestUnsplash.send()
// console.log();
const button = document.querySelector('#set-keys')
button.onclick = setKeys
