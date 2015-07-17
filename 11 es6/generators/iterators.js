'use strict';

// Array.from();

Array.from(new Map().set(false, 'no').set(true, 'yes'));

Array.from(new Map().set(false, 'no').set(true, 'yes'));
[ [ false, 'no' ], [ true, 'yes' ] ]
Array.from({ length: 2, 0: 'hello', 1: 'world' })
[ 'hello', 'world' ]

let map = new Map().set('007','bond').set('008', 'daskovsky');
for (let [num, agent] of map) { console.log(`Agent ${num} is ${agent}`); }

let arr = ['james', 'bond', 'john', 'mainwaring'];
for (let pair of arr.values()) { console.log(pair); }

let obj = { nickame: 'james', secretName: 'bond'};

  function objectEntries(obj) {
        let index = 0;
    
        // In ES6, you can use strings or symbols as property keys,
        // Reflect.ownKeys() retrieves both
        let propKeys = Reflect.ownKeys(obj);
    
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (index < propKeys.length) {
                    let key = propKeys[index];
                    index++;
                    return { value: [key, obj[key]] };
                } else {
                    return { done: true };
                }
            }
        };
    }
    
    let obj = { first: 'Jane', last: 'Doe' };
    for (let [key,value] of objectEntries(obj)) {
        console.log(`${key}: ${value}`);
    }


// for (let prop of {}) {
//   console.log(prop);
// }


// entries()
// keys()
// values() x WAT

// let arr = ['a', 'b', 'c'];

// for (let pair of arr.entries()) {
//   console.log(pair);
// }

// DOM

// for (let node of document.querySelectorAll('...')) {
//   ...
// }


// argument

// function printArgs() {
//   for (let item of arguments) {
//     Array.prototype.push.call(arguments, 'a'); // classic! tail recursion at its best
//     console.log(item);
//   }
// }

// printArgs(2, 3, 5);

// Set

// let set = new Set().add('a').add('b').add({'c': 33});

// for (let item of set) {
//   console.log(item);
// }

// Map
// let map = new Map().set(33, {2:'some'}).set('c', 3).set('a', 1);

// for (let pair of map) {
//   console.log(pair);
// }

// let arr = ['a', 'b', 'c'];
// console.log(arr);

// let iter = arr[Symbol.iterator]();

// // data source
// // Symbol.iterator
// // returns an iterator
// // next()

// // data consumer
// // use the iterator to retrieve data

// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// let a = ['John', 'Faraji'];
// a.hidden = 'illy';

// for (let person in a){
//   console.log(a[person]); // John, Faraji, illy
// }

// for (let person of a) {
//   console.log(person);    // John, Faraji
// }


// for (let x of 'abc\uD83D\uDC0A') {
//   console.log(x);
// }

// var global = 'i am global';

// function will () {
//   global;
//   var local = 'i am local';
// }

// //local; // error

// for (let i = arr.length - 1; i >= 0; i--) {

// }

// console.log(i); // undefined

// {
//   let j = 30;
// }

// j // error

