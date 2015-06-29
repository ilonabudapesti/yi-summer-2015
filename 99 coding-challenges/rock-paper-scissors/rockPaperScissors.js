/*
* Imagine we are playing a three-round game of  rock, paper, scissors.
* Write a function that outputs all possible combinations 
* that one player could play.
*
* Your output should look something like:
*   [["rock", "rock", "rock"],
*    ["rock", "rock", "paper"],
*    ["rock", "rock", "scissors"],
*    ["rock", "paper", "rock"],
             ...etc...
     ]
*
* Extra credit:
*   - Make your function return answers for any number of rounds.
*   
* Example:
* rockPaperScissors(5); // => [['rock', 'rock', 'rock', 'rock', 'rock'], etc...]
*
* Extra extra credit:
*   - Write a test suite with mocha, add specs and a spec runner to test your function.
*/

var rockPaperScissors = function (rounds) {

    rounds = rounds || 3;
    var outcomes = [];

    var plays = ['rock', 'paper', 'scissors'];

    var createNextRound = function(roundsToGo, playedSoFar) {
      
      if( roundsToGo === 0 ){
        outcomes.push( playedSoFar );
        return;
      }

      for( var i = 0; i < plays.length; i++ ){
        var currentPlay = plays[i];
        createNextRound( roundsToGo-1, playedSoFar.concat(currentPlay) );
      }
    };

    createNextRound( rounds, [] );

    return outcomes;
};
