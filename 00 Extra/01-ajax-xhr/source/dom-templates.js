function setImageResultHTMLTemplateBy({urls}) {
  return `<figure>
            <img src="${urls.thumb}">
          </figure>`
}

function setArticleResultHTMLTemplateBy({snippet, web_url}) {
  return `<div class="bx--margin-bottom-xs">
            <p>${snippet}</p>
            <footer>
              <a class="bx--link" href="${web_url}">Read the article</a>
            </footer>
          </div>`
}

function setLoadingHTMLTemplate() {
  return `<div class="bx--loading-overlay" data-inject="loading">
            <div data-loading class="bx--loading">
              <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                <title>Loading</title>
                <circle cx="0" cy="0" r="37.5" />
              </svg>
            </div>
          </div>`
}