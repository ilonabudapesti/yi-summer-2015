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
      return array[array.length - 1];
    }
    return array.slice(Math.max(0, array.length - n));
      };

  _.each = function(collection, iterator) {

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
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

    var result = [];

    _.each(collection, function(val) {
      test(val) && result.push(val);
    });

    return result;
      };

  _.reject = function(collection, test) {


    return _.filter(collection, function(val) {
      return !test(val);
    });
      };

  _.uniq = function(array) {

    var hash = {};

    _.each(array, function(val) {
      hash[val] = val;
    });

    return _.map(hash, function(value) {
      return value;
    });
      };

  _.map = function(collection, iterator) {


    var results = [];

    _.each(collection, function(item, index, collection) {
      results.push(iterator(item, index, collection));
    });

    return results;
      };

  _.pluck = function(collection, key) {

    return _.map(collection, function(item){
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {

    var initializing = arguments.length === 2;

    _.each(collection, function(val) {
      if (initializing) {
        initializing = false;
        accumulator = val;
      } else {
        accumulator = iterator(accumulator, val);
      }
    });

    return accumulator;
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


    iterator = iterator || _.identity;

    return !!_.reduce(collection, function(allPassed, val) {
      return allPassed && iterator(val);
    }, true);
      };

  _.some = function(collection, iterator) {

    iterator = iterator || _.identity;

    return !_.every(collection, function(item) {
      return !iterator(item);
    });
      };


  /**
   * OBJECTS
   * =======
   */

  _.extend = function(obj) {

    _.each(Array.prototype.slice.call(arguments, 1), function(object) {
      _.each(object, function(prop, key) {
        obj[key] = prop;
      });
    });

    return obj;
  };

  _.defaults = function(obj) {

    _.each(Array.prototype.slice.call(arguments, 1), function(object) {
      _.each(object, function(prop, key) {
        obj[key] === undefined && obj[key] = prop;
      });
    });

    return obj;
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

    var memos = {};
    return function() {
      var serialization = JSON.stringify(arguments);
      return memos[serialization] = memos[serialization] || func.apply(this, arguments);
    };
  };

  _.delay = function(func, wait) {

    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      return func.apply(null, args);
    }, wait);
      };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  _.shuffle = function(array) {

    var out = array.slice();
    var temp;
    var currentIx = array.length - 1;
    var swapIx;

    while (currentIx) {
      swapIx = Math.floor(Math.random() * currentIx);

      currentIx -= 1;

      temp = out[currentIx];
      out[currentIx] = out[swapIx];
      out[swapIx] = temp;
    }

    return out;
      };


  /**
   * EXTRA CREDIT
   * =================
   */

  _.invoke = function(collection, functionOrKey, args) {

    return _.map(collection, function(item) {
      var method = typeof functionOrKey === 'string' ? item[functionOrKey] : functionOrKey;

      return method.apply(item, args);
    });
      };

  _.sortBy = function(collection, iterator) {

    if (!collection.length) {
      throw new TypeError('Collection must be an array.');
    }

    if (Object.prototype.toString.call(iterator) === '[object String]') {
      var iter = iterator;
      iterator = function(item) {
        return item[iter];
      };
    }

    return collection.sort(function(a, b) {
      return iterator(a) - iterator(b);
    });
      };

  _.zip = function() {

    var max = 0;
    var result = new Array(max);

    _.each(arguments, function(arg) {
      max = Math.max(arg.length, max);
    });

    for (var i = 0; i < max; i++) {
      result[i] = _.pluck(arguments, i);
    }

    return result;
      };

  _.flatten = function(nestedArray, result) {

    return _.reduce(nestedArray, function(memo, val){
      return memo.concat(Array.isArray(val) ? _.flatten(val) : [val]);
    }, []);
      };

  _.intersection = function() {

    var others = Array.prototype.slice.call(arguments, 1);

    return _.filter(_.uniq(arguments[0]), function(item) {
      return _.every(others, function(array) {
        return _.indexOf(array, item) > -1;
      });
    });
      };

  _.difference = function(array) {

    var others = _.flatten(Array.prototype.slice.call(arguments, 1));

    return _.filter(array, function(item) {
      return !_.contains(others, item);
    });
      };

  _.throttle = function(func, wait) {

    var flag = false;

    return function() {
      if (flag !== true) {
        flag = true;
        func.apply(Array.prototype.slice.apply(arguments));

        setTimeout(function() {
          flag = false;
        }, wait);
      }
    };
      };
}());
