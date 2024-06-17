'use strict'

class Human{
    constructor(name, age, profession){
        this.name = name;
        this.age = age;
        this.profession = profession;
    }
    print(){
        console.log(`name: ${this.name}`)
        console.log(`age: ${this.age} years old`)
        console.log(`profession: ${this.profession}`)
        console.log('----------------')
    }
}

let humanA = new Human('Sergey', 23, 'waiter')
let humanB = new Human('Alexander', 30, 'handyman')

humanA.print()
humanB.print()