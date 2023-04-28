function domainIsSame(url1, url2){
    const urlObj1 = new URL(url1)
    const urlObj2 = new URL(url2)
    const hostname1 = urlObj1.hostname
    const hostname2 = urlObj2.hostname

    return (hostname1 === hostname2)
}

module.exports = {
    domainIsSame
}