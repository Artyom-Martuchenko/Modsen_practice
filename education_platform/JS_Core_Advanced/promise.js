"use strict";

let promise = new Promise(function (resolve, reject) {
  resolve("First promise is done!")
});

promise.then(
  (result) => {
    console.log(result)
    let promise2 = new Promise((resolve, reject) => {
        resolve('Second promise is done!')
    })
    promise2.then((result)=>{
        console.log(result)
        let promise3 = new Promise((resolve, reject) => {
            console.log('Third promise is done!')
        })
    },
    )
  },
);
