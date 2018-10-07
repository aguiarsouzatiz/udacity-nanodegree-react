'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// const apiCredentials = [
// {key: 'unsplash'},
// {key: 'nytimes'},
// ]

function setTimeValueBy() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'one-day';

  return { '1-minute': 60, '10-minutes': 60 * 10, 'one-hour': 60 * 60, 'one-day': 60 * 60 * 24 }[time];
}

function getCookieExpiredTime(time) {
  var now = new Date();
  now.setTime(now.getTime() + 1 * setTimeValueBy(time) * 1000);
  return now.toGMTString();
}

function getCookieWith(key) {
  var cookies = document.cookie.split(';');
  return cookies.find(function (cookie) {
    return cookie.includes(key);
  }).trim();
}

function extactContentOf(cookie) {
  var _cookie$split = cookie.split('\='),
      _cookie$split2 = _slicedToArray(_cookie$split, 2),
      key = _cookie$split2[0],
      value = _cookie$split2[1];

  return { key: key, value: value };
}

document.addEventListener('DOMContentLoaded', function () {
  var targets = getEachElementsWith('[data-event="set-keys"]');

  targets.forEach(function (target) {
    var key = target.dataset.target;
    var input = getElementBy('[data-input="' + key + '"]');
    var targetCookie = extactContentOf(getCookieWith(key));

    if (targetCookie) input.value = targetCookie.value;
  });

  targets.forEach(function (target) {
    return target.addEventListener('click', function () {
      var key = target.dataset.target;
      var input = getElementBy('[data-input="' + key + '"]');
      var accessKey = input.value;

      document.cookie = key + '=' + accessKey + ';expires=' + getCookieExpiredTime("one-day") + ';';
    });
  });
});

function showResponse(event) {
  console.log(event);
}

function getElementBy(targetReference) {
  return document.querySelector(targetReference);
}

function getEachElementsWith(targetsReference) {
  return Array.from(document.querySelectorAll(targetsReference));
}

function getAccessKeyOf(apiName) {
  return {
    'unsplash': handleStorageOfAccessKey('unsplash'),
    'nytimes': handleStorageOfAccessKey('nytimes')
  }[apiName];
}

function handleStorageOfAccessKey(apiName) {
  return extactContentOf(getCookieWith(apiName)).value || getElementBy('[data-input="' + apiName + '"]').value;
}

var requestUnsplash = new XMLHttpRequest();
var searchForText = getElementBy('#search-text').value || '';

requestUnsplash.open('GET', 'https://api.unsplash.com/search/photos?page=1&query=city');
requestUnsplash.onload = showResponse;
var accessKey = getAccessKeyOf('unsplash');
requestUnsplash.setRequestHeader('Authorization', 'Client-ID ' + accessKey);
// requestUnsplash.send()
