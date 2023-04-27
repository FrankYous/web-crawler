function main(){
    inputCount = process.argv.length -2
    try{
        if (inputCount < 1){
            throw new Error('No input argument was entered.')
        } else if (inputCount > 1){
            throw new Error('More than one input argument was entered.')
        } else {
            console.log(`Initializing the crawler at ${process.argv[2]}...`)
        }
    }
    catch(err){
        console.log(err.message)
    }
}


main()