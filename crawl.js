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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}