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
    let links = dom.window.document.querySelectorAll('a')
    for (let link of links){
        let linkURL = new URL(link)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}