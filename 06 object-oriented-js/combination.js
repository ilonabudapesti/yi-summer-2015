// pseudo-classical pattern
// mixed/combination constructor-prototype pattern
function Person() {
}

Person.prototype.name = "Adam";
Person.prototype.age = 30;
Person.prototype.job = "developer";
Person.prototype.sayName = function() {
  console.log('My name is ', this.name);
}

// less typing
Person.prototype = {
  constructor: Person,

  name: "Adam",
  age: 30,
  job: "developer",
  sayName: function() {
    console.log('My name is ', this.name);
  }
};


function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
  Person.call(this);
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.getPaid = function(salary) {
  var bankAccount;
  bankAccount += salary;
}

var ben = new Employee();
console.log(ben instanceof Person);
console.log(ben instanceof Employee);
console.log(ben instanceof Object);
console.log(ben.constructor);
typeof ben;

//superclass
function Person (name) {

  this.name = name || "Eve";

}

Person.prototype.name = "Adam";
Person.prototype.age = Infinity;
Person.prototype.shape = "humanoid";
Person.prototype.nostrils = 2;
Person.prototype.toes = 10; 
Person.prototype.sayStuff = function() {
  console.log("Dis is me: ", this.name, ", ", this.age, ", ", this.shape, ", ", this.nostrils, ", ", this.toes, "!" );
};


// subclass
function Yogi() {
  Person.apply(this, arguments);
}

// Yogi.prototype = Person.prototype;
Yogi.prototype.sayStuff = function() {
    console.log("Namaste! ", this.name, ", ", this.age, ", ", this.shape, ", ", this.nostrils, ", ", this.toes, "!");
};
Yogi.prototype.constructor = Person;

var constanza = new Yogi("Constanza");
constanza.sayStuff();

var marjorie = new Person();
marjorie.sayStuff();

var thomas = new Person("thomas");

thomas.age = 800;

thomas.sayStuff();


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
// thanks Douglas Crockford
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
