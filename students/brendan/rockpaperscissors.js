// Recursive Solution
function listAllPossibleCombinations (rounds) {

    var moveOptions = [['rock'],['paper'],['scissors']];

    return recursiveBranch( rounds - 1 , moveOptions );

    function recursiveBranch ( roundsRemaining, startValue ) {

        if ( roundsRemaining <= 0 ) { return startValue; }

        var nextStartValue = [];
        // For each item in startValue
        for (var i = 0; i < startValue.length; i++) {
            // Create as many duplicates as there are move options, 
            // adding each move option to the end of a duplicate.
            for (var j = 0; j < moveOptions.length; j++) {
                nextStartValue.push(  startValue[i].concat( moveOptions[j] )  );
            }
        }
        return recursiveBranch( roundsRemaining - 1, nextStartValue );
    }
}
