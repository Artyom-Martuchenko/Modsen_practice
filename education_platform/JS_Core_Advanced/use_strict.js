"use strict";

//Example input: node use_strict.js 5 6 7 8 9 10

let [, , ...args] = process.argv;

function factorial(number, intermediate_result) {
  if (number > 1) {
    intermediate_result *= number;
    number -= 1;
    return factorial(number, intermediate_result);
  } else {
    return intermediate_result;
  }
}

let result = [];

for (let index = 0; index < args.length; index++) {
  result.push(Number(args[index]));
  console.log(`Factorial of ${args[index]}:`);
  console.log(factorial(result[index], 1));
}
