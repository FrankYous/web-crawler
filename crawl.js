function normalizeURL (inputURL){
    const myURL = new URL(inputURL)
    const myHostname = myURL.hostname
    let myPathname = myURL.pathname
    if (myPathname.at(-1) === '/'){
        myPathname = myPathname.slice(0,-1)
    }
    return (`${myHostname}${myPathname}`)
}

function getURLsFromHTML (htmlBody, baseURL){
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM(htmlBody)
    const anchorTags = dom.window.document.querySelectorAll('a')
    let links = []
    for (const anchorTag of anchorTags){
        let link = anchorTag.href
        if (link[0] === '/'){
            link = baseURL + link
        }
        links.push(link)
    }
    return links
}

async function crawlPage(baseURL, currentURL, pages){
    const response = await fetch(baseURL)
    try {
        if (response.status >= 400){
            throw new Error(`Encountered ${response.status} error`)
        }
        else if (!response.headers.get('content-type').includes('text/html')){
            throw new Error('Error: The response is not text/html.')
        }
        else {
            htmlBody = await response.text()
            console.log(htmlBody)
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}