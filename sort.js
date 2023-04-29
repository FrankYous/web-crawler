function sortDict(dictionary){
    const unsortedArray = Object.entries(dictionary)
    const sortedArray = unsortedArray.sort(function (a,b) {return b[1]-a[1]})
    return sortedArray
}

module.exports={
    sortDict
}