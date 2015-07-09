var Promise = require('bluebird');

function doSomethingAsync() {
    return new Promise(function(resolve, reject) {
        setTimeout(generateRandom, 2500);

        function generateRandom() {
            var random = Math.random();
            console.log('Generated random: ', random);

            if( random < 0.5 ) {
                reject('Couldn\'t get enough power!')
            }
            else {
                resolve(random);
            }
        }
    });
}

function addLateThen() {
    console.log('Adding late then');
    doSomethingPromise.then(
        function(randomNumber) {
            console.log('Late add random number: ', randomNumber);
        },
        function(reason) {
            console.log('Late failure reason: ', reason);
        }
    )
}

var doSomethingPromise = doSomethingAsync();
doSomethingPromise.then(
    function(randomNumber) {
        console.log('Random number is: ', randomNumber);
    },
    function(reason) {
        console.log('Failed because: ', reason);
    }
);

console.log('Done with async promise chain');

setTimeout(addLateThen, 5000);