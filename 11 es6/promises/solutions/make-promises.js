var Promise = require('bluebird');

function doSomethingAsync() {
    return new Promise(function(resolve, reject) {
        setTimeout(generateRandom, 2500);

        function generateRandom() {
            var random = Math.random();
            console.log('Random number generated: ', random);

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

            var promiseA = new Promise(function(resolve) { setTimeout(divideRandom.bind(null, resolve), 1000); });
            var promiseB = new Promise(function(resolve) { setTimeout(addRandom.bind(null, resolve), 2000); });

            return promiseA;
            //return [promiseA, promiseB];

            function divideRandom(resolve) {
                console.log('Dividing random by 2');
                resolve(randomNumber / 2);
            }

            function addRandom(resolve) {
                console.log('Adding 2 to random');
                resolve(randomNumber + 2);
            }
        },
        function(reason) {
            console.log('Failed because: ', reason);
        }
    )
    .then(
        function(maths) {
            console.log('Maths: ', maths);
        }
    );

console.log('Done with async promise chain');