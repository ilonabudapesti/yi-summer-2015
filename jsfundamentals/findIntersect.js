function findIntersectN(){
    var storage = {};
    var result = [];
    var args = Array.prototype.slice.call(arguments);
    var n = args.length;

    if (args.length === 0) {
        return [];
    }
    if (args.length === 1) {
        return args[0];
    }
    // for arr in args
    for (var i = 0; i < n; i++) {
        // for element in arr
        var arr = args[i];
        for (var j = 0; j < arr.length; j++) {
            var element = arr[j];
            if (storage[element] === undefined){
                storage[element] = [];
            } else if (storage[element][storage[element].length-1] === i) {
                // do nothing because already counted
            } else {
                storage[element].push(i);
                // if this is the last array
                // also add it to result
                if (i === n-1) {
                    result.push(JSON.parse(element));
                }
            }
        }
    }
    return result;
}

function findIntersect (arr1, arr2) {
    
    var storage = {};
    var result = [];

    // cast each unique element into our storage object
   
        for ( var i = 0; i < arr1.length; i++ ) {
            if ( storage[ arr1[i] ] === undefined ) {
                storage[ arr1[i] ] = false;
            }
        }
    
        for ( var i = 0; i < arr2.length; i++ ) {
            if ( storage[ arr2[i] ] !== undefined) {
                storage[ arr2[i] ] = true;
            }
        }
   

    for ( var prop in storage ) {
        if ( storage[prop] ) {
            return.push(JSON.parse(prop));
        }
    }

    return result;

}


findIntersect([1,2,3],[1,2,3]);           // ['1','2','3']
findIntersect([1,2,3],[4,5,6]);           // []
findIntersect([2,2,3],[2,2,4]);           // ['2']
findIntersect(['A','B','C'],[1,'B',3]);   // ['B']


//John's solution
var arr1 = [1,2,3];
var arr2 = [2,3,4];

function findIntersection(a, b){
    
    var result = [];
    
    for (var i = 0; i < a.length; i++){
        var match;
    
        for (var k = 0; k < b.length; k++){
            if (a[i] === b[k]){
                match = a[i]; // 2
                break;
            }
        }
        
        // checking for duplicates in result
        if (match !== undefined) { // 0 , "", null // NEVER! != == !== ===
            for (var j = 0; j < result.length; j++){
                var already = false;
    
                if(match === result[j]){
                    already = true;
                    break;
                }
            }
    
            if(!already){
                result.push(match);
            }
        }
    }
    return result;
}

findIntersect(arr1,arr2); // [2, 3]

// Will

var winterOlympicHosts = ["United States", "France", "Germany", "Japan", "Italy", "Canada", "Switzerland", "Norway", "Austria", "Russia", "South Korea"];

var summerOlympicHosts = ["United States", "France", "Germany", "Japan", "United Kingdom", "Italy", "Canada", "Australia", "Russia", "South Korea", "Brazil", "Sweden", "Belgium", "Netherlands", "Finland", "Mexico", "Spain", "China", "Yugoslavia", "Greece"];


var sameHosts = [];

function findMatches(a, b){
    var allHosts = a.concat(b);
    allHosts.sort();
    
    for (i = 0; i<allHosts.length; i++) { 
        if (allHosts[i] === allHosts[i + 1]) {
            sameHosts.push(allHosts[i]);
        }
    } 
    return sameHosts;
}

findMatches(winterOlympicHosts, summerOlympicHosts); // []


// Faraji



