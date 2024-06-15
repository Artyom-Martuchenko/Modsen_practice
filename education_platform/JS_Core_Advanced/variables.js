'use strict'

function some_function(){
    if(true){
        var x = 'var'
        let y = 'let'
        const z = 'const'
    }
    console.log(x)
    // x виден
    console.log(y)
    // y не виден ReferenceError: y is not defined
    console.log(z)
    // z не виден ReferenceError: y is not defined
}

some_function()