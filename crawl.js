function normalizeURL (inputURL){
    const myURL = new URL(inputURL)
    const myHostname = myURL.hostname.toLowerCase()
    let myPathname = myURL.pathname.toLowerCase()
    if (myPathname.at(-1) === '/'){
        myPathname = myPathname.slice(0,-1)
    }
    return (`${myHostname}${myPathname}`)
}

module.exports = {
    normalizeURL
}