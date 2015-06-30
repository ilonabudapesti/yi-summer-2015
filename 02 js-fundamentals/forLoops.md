#### PLAYTIME

- Counting up
  - Declare a variable `i` and assign `0` value to it.
  - While `i` is less than 10, console.log the value of i
  - Increment `i` each time after you console.logged its value

- Print n asterisks
  - Ask the user for a number (hint: google prompt())
  - Console log an asterisk on each line, but one asterisk more than on the previous line, do this until you reach n
  - You should end up with a triangle looking something like this
  
  ```js
  *
  **
  ***
  ****
  *****
  ```

- `for` loop

```js
for (start with this; loop if this expression is true; do this after each loop) {
  - in each loop do this code once
}


```

(Adapted from this [Python tutorial](http://learnpythonthehardway.org/book/ex33.html))
- What's the difference between a for-loop and a while-loop?
- A for-loop takes three **arguments**. A while-loop just takes one.
- How are they similar? 
- In both a for-loop and a while-loop you can set your own truth condition, which decides whether to enter the loop or not. However, while-loops are harder to get right and you normally can get many things done with for-loops.
- Loops are hard. The main reason people don't understand loops is because they can't follow the "jumping" that the code does. When a loop runs, it goes through its block of code, and at the end it jumps back to the top. To visualize this, put console.log statements all over the loop printing out where in the loop Python is running and what the variables are set to at those points. Write print lines before the loop, at the top of the loop, in the middle, and at the bottom. Study the output and try to understand the jumping that's going on.

##### PLAYTIME

(Source: http://www.cs.cmu.edu/~mrmiller/15-110/Handouts/while.pdf)
- Cumulative Sum
  - Write a method with a while loop that computes the sum of first n positive integers: `sum = 1 + 2 + 3 + … + n`
  - Examples: n = 5 sum = 15, n = 19 sum = 190
  - Now re-do cumulative sum using a for-loop 
-  Fencepost Loop
  - Write a method with a while loop that prints 1 through n, separated by commas. E.g., for n = 9 print `1, 2, 3, 4, 5, 6, 7, 8, 9` (hint: use a variable to store strings and add to them with `+`)
  - No re-do Fencepost Loop with a for-loop
- Extra credit:
  - Complete the exercises at http://cs.smith.edu/dftwiki/index.php/CSC111_While_Loop_Exercises in JavaScript