const { crawlPage } = require('./crawl.js')


function main(){
    inputCount = process.argv.length -2
    baseURL = process.argv[2]
    try{
        if (inputCount < 1){
            throw new Error('No input argument was entered.')
        } else if (inputCount > 1){
            throw new Error('More than one input argument was entered.')
        } else {
            console.log(`Initializing the crawler at ${baseURL}...`)
            crawlPage(baseURL, baseURL, )
        }
    }
    catch(err){
        console.log(err.message)
    }
}


main()