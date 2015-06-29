(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   */

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length-1];
    } else {
      return array.slice(Math.max(0, array.length-n));
    }
  };


  _.each = function(collection, fun) {
    if ( Array.isArray(collection) ) {
        for (var i = 0; i < collection.length; i++) {
            fun(collection[i], i, collection);
        }
    }
    else {
        for (var i  in collection) {
            fun(collection[i], i, collection);
        }
    }
  };

  _.indexOf = function(array, target){



    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  _.filter = function(collection, test) {
  };

  _.reject = function(collection, test) {
    // show
  };

  // _.uniq = function(list) {
  //   var result = [];

  //   checkEachElement: for (var i = 0; i < list.length; i++) {
  //       for (var k = 0; k < result.length; k++) {
  //           if ( list[i] === result[k] ) continue checkEachElement;
  //       }
  //       result.push( list[i] );
  //   }

  //   return result;
  // };

  // _.uniq  = function (arr) {
  //     var existingValues = {};
  //     var result = [];
  //     var containsUndefined = false;
  //     _.each(arr, function (item) {
  //         var type = typeof item;
  //         // Initialize to {}
  //         if ( existingValues[item] === undefined ) {
  //              existingValues[item] = {};
  //         }
  //         // Handle all cases but undefined, checking type
  //         if ( item !== undefined                         &&
  //            ( existingValues[item][type] === undefined ) ||
  //              existingValues[item][type] !== item ) {
  //                     existingValues[item][type] = item;
  //                     result.push(item);
  //                     }
  //         // Handle undefined
  //         if ( item === undefined && containsUndefined === false ) {
  //             result.push(item);
  //             containsUndefined = true;
  //         }
  //     });
  //     return result;
  // }

  _.uniq = function(array) {
    var hash = {};

    _.each(array, function(val) {
      hash[val] = val;
    });

    return _.map(hash, function(value) {
      return value;
    });
  }

  _.map = function(collection, iterator) {
    var result = [];

    _.each(collection, function(item, index, collection){
      result.push(iterator(item, index, collection));
    });

    return result;
  };

  _.pluck = function(collection, key) {



    return _.map(collection, function(item){
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {
  };

  _.contains = function(collection, target) {


    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  _.every = function(collection, iterator) {

  };

  _.some = function(collection, iterator) {

  };

// stop here
  /**
   * OBJECTS
   * =======
   */

  _.extend = function(obj) {
  };

  _.defaults = function(obj) {
  };


  /**
   * FUNCTIONS
   * =========
   */

  _.once = function(func) {



    var alreadyCalled = false;
    var result;



    return function() {
      if (!alreadyCalled) {
    
    
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
  
      return result;
    };
  };

  _.memoize = function(func) {
  };

  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  _.shuffle = function(array) {
  };


  /**
   * EXTRA CREDIT
   * =================
   */

  _.invoke = function(collection, functionOrKey, args) {
  };

  _.sortBy = function(collection, iterator) {
  };

  _.zip = function() {
  };

  _.flatten = function(nestedArray, result) {
  };

  _.intersection = function() {
  };

  _.difference = function(array) {
  };

  _.throttle = function(func, wait) {
  };
}());
