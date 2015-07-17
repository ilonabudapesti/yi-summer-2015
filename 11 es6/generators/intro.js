setTimeout(function(){
  console.log("hello illy");
}, 1);

function foo() {
  for (var i = 0; i <= 1000; i++) {
    console.log(i);
  }
}

foo();

function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

var it = foo();

function* bar() {
  yield 1;
  return 2;
  yield 3;
}

var that = bar();

//

function foo(x) {
  console.log( "x: ", x);
}

function* bar() {
  var message = yield;
  foo( message );
}

var it = bar();

it.next();
it.next('hello');


function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var it = foo(5);
it.next();
it.next(12);
it.next(13);

function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (var v of foo()) {
  console.log(v)
}

var it = foo();
it.next(); // 1
it.next(); // 2
for (var v of it) {
  console.log(v) //3 4 5
}
it.next(); //{value: undefined, done: true} 
// we lost access to the return value


