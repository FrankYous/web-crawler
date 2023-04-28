const { crawlPage } = require('./crawl.js')


async function main(){
    const inputCount = process.argv.length -2
    const baseURL = process.argv[2]
    try{
        if (inputCount < 1){
            throw new Error('No input argument was entered.')
        } else if (inputCount > 1){
            throw new Error('More than one input argument was entered.')
        } else {
            console.log(`Initializing the crawler at ${baseURL}...`)
            pages = await crawlPage(baseURL, baseURL,[])
            console.log('=====List of pages:=====')
            console.log(pages)
        }
    }
    catch(err){
        console.log(err.message)
    }
}


main()