// var person = new Object();
// person.name = "Ralf";
// person.height = 44;
// person.leap = function() {
//   console.log("GREAT LEAP!");
// };

// data properties
  // attributes
    // [[Configurable]]
    // [[Enumerable]]
    // [[Writable]]
    // [[Value]]

/*person = {
  'name': {
    value: 'Ralf',
    enumerable: true,
    writable: true,
    configurable: true
  }
}*/

/*var person = {
  name: "Rudolfo";
}*/

// Object.defineProperty(person, "shape", {
//   // writable: false,
//   // enumerable: true,
//   value: "rotund"
// });

// Object.defineProperty(person, "hairColor", {
//   configurable: false,
//   writable: true,
//   value: "blue"
// });

// Object.defineProperty(person, "nostrils", {
//   enumerable: false,
//   value: 2
// });

// // accessor properties
// var pValue = 13;
// Object.defineProperty(person, "toes", {
//   enumerable: true,
//   configurable: true,
//   get: function() { return this.nostrils * 6; },
//   set: function(newValue) { this.toes = newValue; }
// });

// // accessor properties


