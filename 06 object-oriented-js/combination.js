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


