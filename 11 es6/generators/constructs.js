'use strict'
// destructuring

let set = new Set().add('monday').add('tuesday').add('wed');

let [x, y] = set;

console.log(x); // 'monday'
console.log(y); // 'tuesday'

let [first, ...rest] = set;

// first = 'monday', rest = ['tue', 'wed'];

