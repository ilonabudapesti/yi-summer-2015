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


// factory pattern
function Cperson (theName, toes, height, shape, hairColor, nostrils ) {
  var o = new Object();
  o.name = theName;
  o.toes = toes;
  o.sayCountOfToes = function () {
    console.log("I am a person. And I have ", o.toes, ' toes!');
  }
  return o;
}

var horace = Person('Horace', 11);
// drawback: no instanceof, contructor p to Person

// // constructor pattern -> global
// function Person (name, toes) {
//   this.name = name;
//   this.toes = toes;
//   this.sayCountOfToes = sayCountofToes;
// }

// // global
// function sayCountofToes() {
//     console.log("I am a person. And I have ", this.toes, ' toes!');
//   }

// var hubert = new Person('Hubert', 1);
// var tim = new Person('Tim', 10);

// Person('Sherlock', 35);


//superclass
function Person (name) {

  this.name = name || "Eve";

}

// Person.prototype.name = "Adam";
// Person.prototype.age = Infinity;
// Person.prototype.shape = "humanoid";
// Person.prototype.nostrils = 2;
// Person.prototype.toes = 10; 
// Person.prototype.sayStuff = function() {
//   console.log("Dis is me: ", this.name, ", ", this.age, ", ", this.shape, ", ", this.nostrils, ", ", this.toes, "!" );
// };


// // subclass
// function Yogi() {
//   Person.apply(this, arguments);
// }

// // Yogi.prototype = Person.prototype;
// Yogi.prototype.sayStuff = function() {
//     console.log("Namaste! ", this.name, ", ", this.age, ", ", this.shape, ", ", this.nostrils, ", ", this.toes, "!");
// };
// Yogi.prototype.constructor = Person;

// var constanza = new Yogi("Constanza");
// constanza.sayStuff();

// var marjorie = new Person();
// marjorie.sayStuff();

// var thomas = new Person("thomas");

// thomas.age = 800;

// thomas.sayStuff();


Person.prototype = {
  
  // reconnect constructor
  constructor: Person,

  name: "Adam",
  age: Infinity,
  shape: 'humanoid',
  nostrils: 2,
  toes: 10,
  sayStuff: function() {
    console.log('all in one');
  }
};

//
console.log('friend stuff coming here: ================= ');
var friend = new Person();
console.log( friend instanceof Object );
console.log( friend instanceof Person );
console.log( friend.constructor === Object );
console.log( friend.constructor === Person );


/*if (typeof Object.create === 'undefined') {
// browser doesn't support Object.create
  Object.create = function (o) {

    function F() {};

    F.prototype = o;

    return new F();
  }

}
*/

function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(n, m) {
  this.x += n;
  this.y += m;
  console.log('Shape moved to: ', this.x, ', ', this.y);
}

function Rectangle() {
  //call superclass constructor
  Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
rect.move(1, 1); // Outputs, "Shape moved to: 1, 1"






