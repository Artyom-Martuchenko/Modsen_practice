'use strict'

//Example input: node arrays.js 1 2 3 4 5 6

let [, , ...args] = process.argv

function increase(arr){
    for(let index = 0; index < arr.length; index++){
        arr[index] = Number(arr[index])
    }

    for(let index = 0; index < arr.length; index++){
        arr[index] += arr[index]/10
    }
    return arr
}

console.log(increase(args))