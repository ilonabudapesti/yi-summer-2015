/*function eat(meal){
  console.log("Meal before bite: ", meal);
  console.log("Eating " + meal.pop() + ". Yumm!");
  if (meal.length) {
    eat(meal);
  }
  else {
    console.log("Done with the meal.");
  }
};


function eatIteratively(meal) {
  while (meal.length) {
    console.log('I am eating iteratively: ', meal.pop());
  }
}

var veggieMeal = ["veggie soup", "tofu", "vegan protein shake"];
eat(veggieMeal);

var veggieMeal = ["veggie soup", "tofu", "vegan protein shake"];
eatIteratively(veggieMeal);

*/






















// ===
var ask = function (question) {
  while (true) {
    var reply = prompt(question);
    if (reply === 'yes') {
      return true;
    } else if (reply === 'no') {
      return false;
    } else {
      alert("Please answer 'yes' or 'no'.");
    }
  }
};

ask("Do you wet the bed?");




















// ===
var askRecursively = function (question) { 
  var reply = prompt(question); 
  if (reply === 'yes') {
    return true;
  } else if (reply === 'no') {
    return false;
  } else {
    alert("Please answer 'yes' or 'no'.")
    askRecursively(question);
  }
};

askRecursively("Do you wet the bed?");



























// ===
// function continentCounter (board, x, y) {
// // we fell off the board
// // or we fell into water
// // or we counted it already
//   if (board[x] === undefined || board[x][y] !== 'land') {
//     return 0;
//   }

//   var count = 1;
//   board[x][y] = 'counted land';

//   count = count + continentCounter(board, x-1, y-1);
//   count = count + continentCounter(board, x-1, y);
//   count = count + continentCounter(board, x-1, y+1);

//   count = count + continentCounter(board, x, y-1);
//   count = count + continentCounter(board, x, y+1);


//   count = count + continentCounter(board, x+1, y-1);
//   count = count + continentCounter(board, x+1, y);
//   count = count + continentCounter(board, x+1, y+1);


//   return count;
// }


var o = "water"; // water
var M = "land"; // land

var board = [ 
  [o,o,o,o,M,o,o,o,o,o],
  [o,o,o,M,M,o,o,o,o,o],
  [o,o,o,o,M,o,o,M,M,o],
  [o,o,M,o,M,o,o,o,M,o],
  [o,o,o,o,M,M,o,o,o,o],
  [o,o,o,M,M,M,M,o,o,o],
  [M,M,M,M,M,M,M,M,M,M],
  [o,o,M,M,o,M,M,M,o,o],
  [o,M,o,o,o,M,M,o,o,o],
  [M,o,o,o,M,M,o,o,o,o]
];

continentCounter(board, 0, 4); // 30


// ===
// //rock paper scissors

// var rockPaperScissors = function (rounds) {
//   var options = ['rock', 'paper', 'scissors'];
//   var pathCount = Math.pow(options.length, rounds);
//   var output = [];
//   for (var i = 0; i < pathCount; i++) {
//     output.push([]);
//   }
//   while (rounds) {
//     for (var i = 0; i < pathCount; i++) {
//       output[i].push(options[Math.floor(i / Math.pow(3, rounds - 1)) % 3]);
//     }
//     rounds--;
//   }
//   return output;
// };

// rockPaperScissors(3);

// // recursively

// var rockPaperScissors = function (rounds) {       // rounds is the number of times we will play per game
//   var result = [];                                // Our results array will be our output
//   var options = ['rock', 'paper', 'scissors'];    // options[] holds our choices

//   var permutate = function(game) {                // Our inner recursive function.
//     game = game || [];                            // Our first iteration game is set to empty.
//     if (game.length === rounds) {                 // Our base case for recursion to end.
//       result.push(game);
//     } else {
//       for (var i = 0; i < options.length; i++) {  
//         permutate(game.concat(options[i]));       // The brain of our function. The loop is called recursively
//       }                                           // Starting with [0, 0, 0], [0, 0, 1], [0, 0, 2], etc
//     }
//   };

//   permutate();                                    // Instantiate inner permutation function
//   return result;                                  // return our result
// };


