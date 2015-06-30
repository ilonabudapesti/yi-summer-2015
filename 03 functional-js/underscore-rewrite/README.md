# Underscore-rewrite

Like the [JavaScript Koans](https://github.com/mrdavidlaing/javascript-koans) here we use the same testing framework [Mocha Test Suite](http://visionmedia.github.io/mocha).

We rewrite [underscore.js](http://underscore.js) written by Jeremy Ashkenas.

- What arguments functions take is called ther **interface** or their **signature**. To find out what interface to use check the official [underscore documentation](http://underscore.js).
- We need to allow any **collection** or **associative array** to be passed on, which includes both arrays and objects. `Array.isArray(obj)` will return `true` if `obj` is an array.
- Javascript's built-in `Math` object. (https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math).
- Each function provides with with a pseudo-array to access its arguments. `arguments` is a reserved keyword and gives us access to all arguments that were passed in even if they weren't named in the function
  definition. This is useful if you don't know how many arguments are going to
  be passed in in advance.
    - You can count the arguments by using `arguments.length` and access each
      argument using `arguments[i]`.
    - The `arguments` object is very similar to an array, but note that it does
      not support most array functions (such as `slice` or `push`). You can read
      more about this [here](http://www.sitepoint.com/arguments-a-javascript-oddity/).
- In this exercise don't use built-in functions, even if your browser provides them to you e.g. forEach, map, reduce or filter. :)

## Structure

Tests are in the `spec` directory. The goal here and in TDD in general is to get all the tests to pass by implementing the missing functions. Run all the tests by opening `SpecRunner.html` in your browser.

Source files are in the `src` directory.

Our testing library is in the `lib` directory.

#### Part I:
- [ ] identity
- [ ] *first*
- [ ] last
- [ ] each
- [ ] *indexOf*
- [ ] filter
- [ ] reject
- [ ] uniq
- [ ] map
- [ ] *pluck*
- [ ] reduce

#### Part II:
- [ ] *contains*
- [ ] every
- [ ] some
- [ ] extend
- [ ] defaults
- [ ] *once*
- [ ] memoize
- [ ] delay
- [ ] shuffle

#### Extra Credit:
- [ ] invoke
- [ ] sortBy
- [ ] zip
- [ ] flatten
- [ ] intersection
- [ ] difference
- [ ] throttle

## Later

- Download the real [underscore.js](https://github.com/documentcloud/underscore/)
  implementation and test suite, and try to understand how it works. A great way
  to do this is to break parts of the code and see which tests fail.
- Compare your implementations to the ones in the real library. Notice that this
  assignment has stripped out some complexity from the original library; notice
  where these changes have been made, and list out the edge cases the
  original library is handling that your functions aren't.
- Notice that the real underscore.js uses an object named `breaker`. Look through the
  source and understand what this is doing, and how it optimizes some of the functions.
