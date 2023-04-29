const { sortDict } = require('./sort')

function printReport(pages){
    console.log('=====Report of the Crawl=====')
    const sortedPages = sortDict(pages)
    for (let sortedPage of sortedPages){
        const url = sortedPage[0]
        const count =  sortedPage[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
    console.log('======End of the Report======')
}
module.exports = {
    printReport
}