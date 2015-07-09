var Promise = require('bluebird');

function doSomethingAsync() {
    return new Promise(function(resolve, reject) {
        setTimeout(generateRandom, 2500);

        function generateRandom() {
            var random = Math.random();

            if( random < 0.5 ) {
                reject('Couldn\'t get enough power!')
            }
            else {
                resolve(random);
            }
        }
    });
}

doSomethingAsync()
    .then(
        function(randomNumber) {
            console.log('Random number is: ', randomNumber);
        },
        function(reason) {
            console.log('Failed because: ', reason);
        }
    );

console.log('Done with async promise chain');