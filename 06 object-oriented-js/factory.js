// factory pattern
function Person (theName, toes, height, shape, hairColor, nostrils ) {
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
