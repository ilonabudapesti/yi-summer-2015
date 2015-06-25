// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (obj !== undefined && typeof obj !== 'function') {

    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj.toString();
    }
    if (obj === null) {
      return 'null';
    }
    if (typeof obj === 'string') {
      return '"' + obj + '"';
    }
    if (Array.isArray(obj)) {
      var strings = [];
      obj.forEach(function(e){
        strings.push(stringifyJSON(e));
      });
      return '['+ strings.join(',') +']';
    }
    
    // otherwise it's an object
     
    var props = [];
    // each key-value pair
    for (var key in obj) {
      if (obj[key] !== undefined && typeof obj[key] !== 'function') {
        props.push('"' + key + '":' + stringifyJSON(obj[key]));
      }
    }
    // curly braces
    return '{' + props.join(',') + '}';
  
  }
};
