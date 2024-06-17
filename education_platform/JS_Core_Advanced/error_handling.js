// Example input: node error_handling.js <number>
'use strict'

try {
    let number = Number(process.argv[2])
    
    if(!Number.isInteger(number)){
        throw new Error(`число ${number} не является целым числом.`)
    }
    
    console.log(`число ${number} - целое`)

} catch (error) {
    console.log(error.message)
}