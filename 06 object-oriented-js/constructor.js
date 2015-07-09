
// constructor pattern -> global
function Person (name, toes) {
  this.name = name;
  this.toes = toes;
  this.sayCountOfToes = sayCountofToes;
}

// global
function sayCountofToes() {
    console.log("I am a person. And I have ", this.toes, ' toes!');
}

var hubert = new Person('Hubert', 1);
var tim = new Person('Tim', 10);

Person('Sherlock', 35);
