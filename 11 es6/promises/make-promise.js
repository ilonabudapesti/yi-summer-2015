var Promise = require('bluebird');

function doSomethingAsync() {
  return new Promise(function(resolve, reject){
    setTimeout(generateRandom, 500);

    function generateRandom() {
      var random = Math.random();

      if ( random > 0 ) {
        reject('Couldn\'t get enough power! I am failing in generateRandom');
      } 
      else {
        resolve(random);
      }
    }
  });
}

doSomethingAsync()
  .then(
    function(randomNumber){
      console.log('Random number is: ', randomNumber);
    })
  .catch( 
    function(reason){
      console.log('Failed because: ', reason);
    });

console.log('Done with async promise chain');