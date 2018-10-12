'use strict';

function getAccessKeyOf(apiName) {
  return {
    'unsplash': handleStorageOfAccessKey('unsplash'),
    'nytimes': handleStorageOfAccessKey('nytimes')
  }[apiName];
}

function handleStorageOfAccessKey(apiName) {
  return extractContentOf(getCookieWith(apiName)).value || getElementBy('[data-input="' + apiName + '"]').value;
}
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function getCookieExpiredTime(time) {
  var now = new Date();
  now.setTime(now.getTime() + 1 * setTimeValueBy(time) * 1000);
  return now.toGMTString();
}

function getCookieWith(key) {
  var cookies = document.cookie.split(';');
  var foundKeyCookie = cookies.find(function (cookie) {
    return cookie.includes(key);
  });
  if (foundKeyCookie) return foundKeyCookie.trim();
}

function extractContentOf(hasCookie) {
  if (hasCookie) {
    var _hasCookie$split = hasCookie.split('\='),
        _hasCookie$split2 = _slicedToArray(_hasCookie$split, 2),
        key = _hasCookie$split2[0],
        value = _hasCookie$split2[1];

    return { key: key, value: value };
  }
}

function setDefaultCookieValueIn(inputTarget) {
  var key = inputTarget.dataset.target;
  var input = getElementBy('[data-input="' + key + '"]');
  var targetCookie = extractContentOf(getCookieWith(key));

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
'use strict';

function getElementBy(targetReference) {
  return document.querySelector(targetReference);
}

function getEachElementsWith(targetsReference) {
  return Array.from(document.querySelectorAll(targetsReference));
}

function setHTMLTemplateOf(apiName) {
  return {
    'nytimes': setArticleResultHTMLTemplateBy,
    'unsplash': setImageResultHTMLTemplateBy
  }[apiName];
}

function removePreviousResultsOf(element) {
  return element.innerHTML = '';
}

function renderResultsOf(dataRequest, apiName, place) {
  var placeToInjectResults = getElementBy('[data-inject="' + place + '"]');
  var dataResponse = extractArrayFrom(apiName)(dataRequest);
  removePreviousResultsOf(placeToInjectResults);

  dataResponse.forEach(function (data) {
    var template = setHTMLTemplateOf(apiName);
    var htmlContent = template(data);
    return placeToInjectResults.insertAdjacentHTML('afterbegin', htmlContent);
  });
}

function extractArrayFrom(apiName) {
  return {
    'nytimes': extractByPropertyResponseDocs,
    'unsplash': extractByPropertyResults
  }[apiName];
}

function conditionalSearch(event) {
  if (event.keyCode === 13) searchInput(event);
}

function removeLoadingStateElementIn(place) {
  var loading = place.querySelector('[data-inject="loading"]');
  return loading.remove();
}

function applyLoadingStateElementIn(place) {
  return place.insertAdjacentHTML('afterbegin', setLoadingHTMLTemplate());
}
"use strict";

function setImageResultHTMLTemplateBy(_ref) {
  var urls = _ref.urls;

  return "<figure>\n            <img src=\"" + urls.thumb + "\">\n          </figure>";
}

function setArticleResultHTMLTemplateBy(_ref2) {
  var snippet = _ref2.snippet,
      web_url = _ref2.web_url;

  return "<div class=\"bx--margin-bottom-xs\">\n            <p>" + snippet + "</p>\n            <footer>\n              <a class=\"bx--link\" href=\"" + web_url + "\">Read the article</a>\n            </footer>\n          </div>";
}

function setLoadingHTMLTemplate() {
  return "<div class=\"bx--loading-overlay\" data-inject=\"loading\">\n            <div data-loading class=\"bx--loading\">\n              <svg class=\"bx--loading__svg\" viewBox=\"-75 -75 150 150\">\n                <title>Loading</title>\n                <circle cx=\"0\" cy=\"0\" r=\"37.5\" />\n              </svg>\n            </div>\n          </div>";
}
'use strict';

function setTimeValueBy() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'one-day';

  return { '1-minute': 60, '10-minutes': 60 * 10, 'one-hour': 60 * 60, 'one-day': 60 * 60 * 24 }[time];
}
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function searchInput(event) {
  var textToSearch = getElementBy('[data-input="search-text"]').value.trim();

  if (textToSearch) {
    var resultsPlace = getElementBy('[data-inject="search-results"]');
    applyLoadingStateElementIn(resultsPlace);

    Promise.all([makeSearchRequestFrom('nytimes', textToSearch), makeSearchRequestFrom('unsplash', textToSearch)]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          nytimes = _ref2[0],
          unsplash = _ref2[1];

      renderResultsOf(nytimes, 'nytimes', 'article-results');
      renderResultsOf(unsplash, 'unsplash', 'image-results');

      removeLoadingStateElementIn(resultsPlace);
    });
  }
}

function setActionsToHTMLElements() {
  return [{ target: getElementBy('[data-event="search-submit"]'), event: 'click', action: searchInput }, { target: document, event: 'keyup', action: conditionalSearch }];
}

setActionsToHTMLElements().forEach(function (_ref3) {
  var target = _ref3.target,
      event = _ref3.event,
      action = _ref3.action;

  target.addEventListener(event, action);
});

document.addEventListener('DOMContentLoaded', function () {
  var inputTargets = getEachElementsWith('[data-event="set-keys"]');
  handleCookieEventsIn(inputTargets);
});
'use strict';

function extractByPropertyResponseDocs(data) {
  return data.response.docs;
}

function extractByPropertyResults(data) {
  return data.results;
}

function parseToJSON(requestData) {
  return JSON.parse(requestData.responseText);
}

function makeSearchRequestFrom(apiName, textToSearch) {
  return new Promise(function (resolve, reject) {
    var _getRequestReferences = getRequestReferencesOf(apiName).toFind(textToSearch),
        url = _getRequestReferences.url,
        hasHeader = _getRequestReferences.hasHeader;

    var requestApi = new XMLHttpRequest();

    requestApi.open('GET', url);
    if (hasHeader) requestApi.setRequestHeader('Authorization', '' + hasHeader);
    requestApi.onload = function (event) {
      return resolve(parseToJSON(event.target));
    };
    requestApi.send();
  });
}

function getRequestReferencesOf(apiName) {
  return { toFind: function toFind(textToSearch) {
      return {
        'nytimes': { url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + textToSearch + '&api-key=' + getAccessKeyOf('nytimes'), hasHeader: false },
        'unsplash': { url: 'https://api.unsplash.com/search/photos?page=1&query=' + textToSearch, hasHeader: 'Client-ID ' + getAccessKeyOf('unsplash') }
      }[apiName];
    }
  };
}
