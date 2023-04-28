const { domainIsSame } = require('./domainCheck')

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

    // Check to see is the URLs are on the same domain
    if (!domainIsSame(baseURL, currentURL)){
        return pages
    }

    // Check if the URL is already in the list of visited pages    
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    } 

    // Get the response of current URL
    const response = await fetch(currentURL)
    try {
        if (response.status >= 400){
            throw new Error(`Encountered ${response.status} error`)
        }
        else if (!response.headers.get('content-type').includes('text/html')){
            const responseType = response.headers.get('content-type')
            throw new Error(`Error: The response is not text/html. Response type: ${responseType}`)
        }
        else {
            console.log(`Current page: ${normalizedCurrentURL}`)
            pages[normalizedCurrentURL] = 1
            const htmlBody = await response.text() // Gets full text of HTML body
            const pageURLs = getURLsFromHTML (htmlBody, baseURL)
            for (const pageURL of pageURLs){
                pages = await crawlPage(baseURL, pageURL, pages)
            }
        }
        return pages
    } catch (err) {
        console.log(err.message)
        return pages
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}