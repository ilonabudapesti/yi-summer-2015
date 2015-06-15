(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
  };

  /**
   * COLLECTIONS
   * ===========
   */

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
  };

  _.each = function(collection, iterator) {
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


  };

  _.uniq = function(array) {
  };


  _.map = function(collection, iterator) {



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
