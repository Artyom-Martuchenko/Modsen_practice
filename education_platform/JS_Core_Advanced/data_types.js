'use strict'

let first_car_dealership = {
    'cars1' : 'BMW M5',
    'cars2' : 'Nissan GTR',
    'cars3' : 'Porshe 911',
    'cars4' : 'BMW X5',
    'cars5' : 'mersedes-benz'
}

let second_car_dealership = {
    'cars1' : 'BMW M7',
    'cars2' : 'Nissan GTR',
    'cars3' : 'Porshe 911',
    'cars4' : 'BMW X7',
    'cars5' : 'Porshe Taycan'
}

function equel(object1, object2){
    for(let key1 in object1){
        for(let key2 in object2){
            if(object1[key1] === object2[key2]){
                console.log(object1[key1])
            }
        }
    }
}

equel(first_car_dealership, second_car_dealership)