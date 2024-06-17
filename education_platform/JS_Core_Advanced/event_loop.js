'use strict'

const callback = () => {
    console.log('Hello!')
}

const main = (callbackFunc) => {
    setTimeout(() => callbackFunc(), 2000)
}

main(callback)