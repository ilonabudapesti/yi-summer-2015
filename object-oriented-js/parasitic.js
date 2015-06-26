function Person (name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  }
  return o;
}

var jane = new Person("Jane", 16, "Software Whizkid");
jane.sayName();

function SpecialArray() {
  var values = new Array();

  values.push.apply(values, arguments);

  values.toPipedString = function() {
    return this.join("|");
  };

  return values;
}

var colors = new SpecialArray("red","yellow", "neon");
console.log(colors.toPipedString());