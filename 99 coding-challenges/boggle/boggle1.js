var fs = require('fs');
var _  = require('underscore'); 

// Boggle Dice Letter Distribution
var die = [
                  "AAEEGN",
                  "ABBJOO",
                  "ACHOPS",
                  "AFFKPS",
                  "AOOTTW",
                  "CIMOTU",
                  "DEILRX",
                  "DELRVY",
                  "DISTTY",
                  "EEGHNW",
                  "EEINSU",
                  "EHRTVW",
                  "EIOSST",
                  "ELRTTY",
                  "HIMNUQ",
                  "HLNNRZ"
          ];

// example board
var board = [
  ["A", "A", "A", "A"],
  ["C", "D", "D", "D"],
  ["E", "E", "E", "E"],
  ["E", "H", "H", "A"]
];  

// write a function that randomly generates a boggle board

function generateBoard () {
  // start with an empty string
  var board = "";

  // retun a string that is 16 characters long
  // e.g. AAAAACDDDEEEEEHH
  return board;
};

var _ = require("underscore");

var dice = [
      "AAEEGN",
      "ABBJOO",
      "ACHOPS",
      "AFFKPS",
      "AOOTTW",
      "CIMOTU",
      "DEILRX",
      "DELRVY",
      "DISTTY",
      "EEGHNW",
      "EEINSU",
      "EHRTVW",
      "EIOSST",
      "ELRTTY",
      "HIMNUQ",
      "HLNNRZ"
];
                  
 function generateBoard(dice) {
   var _dice = dice.slice();
   var board = [];
   
  //nice way to randomize
   _dice.sort(function(){
     return Math.random() > 0.5 ? 1 : 0; 
     // return Math.random() > 0.5 ? 1 : -1 // would also work
   });
   
   _.each(_dice, function(item){
     var pick = Math.floor(Math.random()*6);
     board.push(item[pick]);
   });

  return board;
   
 }

 console.log(generateBoard(dice));


function filter (collection, test) {
  return reduce(collection, function(memo, item){

    //Array.prototype.push returns the new length of array not the array, so this code is wrong
    return test(item) ? memo = memo.push(item) : memo;
    
    //Instead we can use concat()
    //Array.prototype.concat returns the array being updated (in this case memo)
    return test(item) ? memo.concat([item]) : memo;
    
    //using that we can also do it this way..
    return memo.concat(test(item) ? [item] : [])
    
    //note using empty array instead of undefined so not to increase length of memo
    return memo.concat(test(item) ? [item] : undefined); // [undefined].length === 1  //true
  }, []); 
}

// test 
// back at you

var Person = function(name){
  this.name = name;
  this.age = null;
};

var steven = new Person('steven');

function textToTrie (file) {
  var words = [];
  var trie  = {};

  fs.readFile(file, function(err, data) {
    if (err) {
      console.log(err);
    }
    words = data.split("\n");
  });
  
  _.each(words, function(word){
    word = word.split(''); // ['c','a','t']
    // iterate
    function tearDown(word) {
      var _word = word;
      var letter = word.shift();
      if (!trie[letter]){
        trie[letter] = tearDown(word); //{c: ['a','t']}
      }
      if (trie[letter]){
        if (word.length === 0) {
          parent["word"] = _word;
        }
      }
    }

    tearDown(word);
  });

}

function jsonToTrie (json) {}
var trie = {
  a: {
    a: {word: "aa"},
    b: {word: "ab"}
  },
  b: {},
  c: {
    a: {
      r: { 
         word: "car", 
         t: { word: "cart" } 
         },
      t: {word: "cat"}
    }
  },
  z: {
    o: {
      o: {word: "zoo"}
    }
  },
}

// sample board

var boggleBoard = [
  ['m', 'g', 'i', 'k'],
  ['a', 'c', 't', 'o'],
  ['b', 'c', 'e', 's'],
  ['n', 'u', 't', 'p']
];

var result = ["toe", "toes", "cute", "acute", "ace"];
    
// function that takes a board and produces all valid words contained within that board

// trie helpers: isWord(string) returns boolean
function contains("string") {}  ca -> true// true/false
function isWord("string") {}    ca -> false, cat -> true
//
    
function solveBoggle(board){

// create array storage to hold valid words
//TODO: dedup
  var storage = [];

// recursive subroutine ( starting position, word) // x, y
  var traverse = function(word, x, y){
    var word = word || '';
    
    if ( board[x] === undefined || board[x][y] === undefined || board[x][y][1] === '*' || !contains(word) ){
      // out of bounds
      // already visited a location
      // if trie does NOT contain the string
      return;
    }
    
    // body
    if (word.length > 2 && isWord(word)){
      storage.push(word);
    }
    word += board[x][y];
    
    board[x][y] += '*'; // flip to visited

    word += traverse(word, x - 1, y + 1);
    word += traverse(word, x - 1, y,   );
    word += traverse(word, x - 1, y - 1);

    word += traverse(word, x,     y + 1); // right
    word += traverse(word, x,     y - 1);

    word += traverse(word, x + 1, y + 1); 
    word += traverse(word, x + 1, y    );
    word += traverse(word, x + 1, y - 1);
    
    board[x][y] = board[x][y][0]; // flip back
  }
  

  // start rercursion
  // do it from all 16 possible starting points
  _.each(board, function(row, i) {
    _.each(row, function(elem, j) {
      traverse(i, j);
    });
  });

  // return array
  return storage;
}


