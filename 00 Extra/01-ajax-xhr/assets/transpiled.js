'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

function setDefaultCookieValueIn(inputTarget) {
  var key = inputTarget.dataset.target;
  var input = getElementBy('[data-input="' + key + '"]');
  var targetCookie = extactContentOf(getCookieWith(key));

  if (targetCookie) input.value = targetCookie.value;
}

function setCookieValueFrom(inputTarget) {
  return function () {
    var key = inputTarget.dataset.target;
    var input = getElementBy('[data-input="' + key + '"]');
    var accessKey = input.value;

    document.cookie = key + '=' + accessKey + ';expires=' + getCookieExpiredTime("one-day") + ';';
  };
}

function applyEventToStoreCookieFrom(inputTarget) {
  inputTarget.addEventListener('click', setCookieValueFrom(inputTarget));
}

function handleCookieEventsIn(inputTargets) {
  inputTargets.forEach(function (input) {
    setDefaultCookieValueIn(input);
    applyEventToStoreCookieFrom(input);
  });
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

function setImageResultHTMLTemplateBy(url) {
  return '<figure>\n            <img src="' + url + '">\n          </figure>';
}

function setArticleResultHTMLTemplateBy(_ref) {
  var snippet = _ref.snippet,
      web_url = _ref.web_url;

  return '<div class="bx--margin-bottom-xs">\n            <p>' + snippet + '</p>\n            <footer>\n              <a class="bx--link" href="' + web_url + '">Read the article</a>\n            </footer>\n          </div>';
}

function setLoadingHTMLTemplate() {
  return '<!-- <div class="bx--loading-overlay">\n            <div data-loading class="bx--loading">\n              <svg class="bx--loading__svg" viewBox="-75 -75 150 150">\n                <title>Loading</title>\n                <circle cx="0" cy="0" r="37.5" />\n              </svg>\n            </div>\n          </div> -->';
}

function removePreviousResultsOf(element) {
  return element.innerHTML = '';
}

function setLoadingStateIn(element) {
  removePreviousResultsOf(element);
  return element.insertAdjacentHTML('afterbegin', setLoadingHTMLTemplate());
}

function renderResultsUnsplash(event) {
  var placeToInjectResults = getElementBy('[data-inject="image-results"]');
  setLoadingStateIn(placeToInjectResults);

  var data = JSON.parse(event.target.responseText);
  removePreviousResultsOf(placeToInjectResults);

  data.results.forEach(function (_ref2) {
    var urls = _ref2.urls;

    var htmlContent = setImageResultHTMLTemplateBy(urls.thumb);
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent);
  });
}

function renderResultsNY(event) {
  var placeToInjectResults = getElementBy('[data-inject="article-results"]');
  setLoadingStateIn(placeToInjectResults);

  var data = JSON.parse(event.target.responseText);
  removePreviousResultsOf(placeToInjectResults);

  data.response.docs.forEach(function (data) {
    var htmlContent = setArticleResultHTMLTemplateBy(data);
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent);
  });
}

function makeRequestUnsplash(textToSearch) {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.unsplash.com/search/photos?page=1&query=' + textToSearch);
  request.setRequestHeader('Authorization', 'Client-ID ' + getAccessKeyOf('unsplash'));
  request.onload = renderResultsUnsplash;
  request.send();
}

function makeRequestNY(textToSearch) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + textToSearch + '&api-key=' + getAccessKeyOf('nytimes'));
  request.onload = renderResultsNY;
  request.send();
}

function searchInput(event) {
  var textToSearch = getElementBy('[data-input="search-text"]').value.trim();
  if (textToSearch) {
    makeRequestUnsplash(textToSearch);
    makeRequestNY(textToSearch);
  }
}

function conditionalSearch(event) {
  if (event.keyCode === 13) searchInput(event);
}

function getActionsToHTMLElements() {
  return [{ target: getElementBy('[data-event="search-submit"]'), event: 'click', action: searchInput }, { target: document, event: 'keyup', action: conditionalSearch }];
}

getActionsToHTMLElements().forEach(function (_ref3) {
  var target = _ref3.target,
      event = _ref3.event,
      action = _ref3.action;

  target.addEventListener(event, action);
});

document.addEventListener('DOMContentLoaded', function () {
  var inputTargets = getEachElementsWith('[data-event="set-keys"]');

  handleCookieEventsIn(inputTargets);
});
