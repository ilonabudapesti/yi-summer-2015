# Yoga Institute Summer Code Camp 2015

# TOC

- [Install Fest]
- [Pre-camp Reading]

## Install Fest

Estimated time needed: 2 hrs.
System requirement: Mac

* [Install Chrome](https://www.google.com/intl/en/chrome/browser/desktop/index.html)
* [Install Sublime 3](http://www.sublimetext.com/3) (don't use 2)
    * Symlink subl.  Assuming you've placed Sublime Text in the Applications folder, and that you have a ~/bin directory in your path, you can run:    

```
ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" ~/bin/subl
```
* Install HomeBrew, a useful package manager for Mac

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
 
* Install Node
    * [Create Apple ID](https://appleid.apple.com/account) if you don't have one already
    * [Install Xcode](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12) from the App Store
    * Open terminal: `Command + Space` to open  Spotlight and type `terminal`
    
    ```
    brew install node
    ```

* Join
    * [GitHub](https://github.com/join)
    * [StackOverflow](https://stackoverflow.com/users/signup)
* Git configuration
    * git config your name, email and editor
        
    ```
$ git config --global user.name "Joan Doe"
$ git config --global user.email joandoe@example.com
$ git config --global core.editor "subl -n -w"
    ```
    
    TODO: add Sublime setup
      - Node build
      - package manager
      - recommended packages
      - key mappings

## Pre-Camp Reading

- JS The Definitive Guide 6th ed. Chapters 1-8
- [JS Types](https://blogs.adobe.com/webplatform/2012/08/27/javascript-types/)
- [JS Operators](https://blogs.adobe.com/webplatform/2012/09/21/javascript-operators/)
- Dev Tools
   - If you prefer to watch videos: [Discover Dev Tools](http://discover-devtools.codeschool.com/)
   - If you prefer to read: [Dev Tools Docs](https://developer.chrome.com/devtools)
   - Dev Tools [Cheatsheet](http://anti-code.com/devtools-cheatsheet/)
   - Advanced features [list on StackOverflow](http://stackoverflow.com/questions/16752622/chrome-developer-tools-best-resource-for-learning-advanced-features)

## JS Fundamentals

- data types: number, string, boolean, object, null, undefined
- operators: basic, advanced, under-the-hood
- arrays
- objects

## Functional JS

- [x] functions
- [x] higher order functions
- [x] closure
- [x] execution context
- [x] lexical scope
- [x] callbacks
- promises
- ES6 generator
- ES6 bracket
- [x] rewrite underscore naive
- read underscore.js source
- [ES6](https://leanpub.com/exploring-es6/read?utm_medium=email&utm_source=jsfiddle)

## jQuery

- http://jqfundamentals.com/
- read jquery source
- rewrite jquery
- ajax

## OO JS

- instantiation patterns
- classical inheritance in other languages
- prototype
- constructor
- Ch. 6 of the Definitive Guide
- [JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
  - Constructor Pattern
  - Module Pattern
  - Revealing Module Pattern
  - Singleton Pattern
  - Observer Pattern
  - Mediator Pattern
  - Prototype Pattern
  - Command Pattern
  - Facade Pattern
  - Factory Pattern
  - Mixin Pattern
  - Decorator Pattern
  - Flyweight Pattern

## MVC

- [rewrite Barebones.js](https://kuychaco.github.io/Barebone.js/docs/BAREBONE.html)
- read Backbone.js source
- Angular.js
- Angular-formly

## MEAN

- Node.js intro
- Express
- Angular

## Git

- git basics
- branching
- develop & drill workflow
- merge vs rebase

## Testing

- rewrite mini-testing framework from scratch [riot.js bdd](https://github.com/riot/riot/blob/2f3820e764932124f97e66cd3e5df36997bde1e8/bdd.js)
- mocha chai sinon
- karma
- jasmine
- phantom and casper

## Deployment

- heroku
- aws

## Polymer 

- webcomponents

## Data Structures
- Linked Lists
- Binary Trees
- Tries
- Stacks
- Queues
- Vectors / ArrayLists
- Hash Tables

## Algorithms
- Breadth First Search
- Depth First Search
- Binary Search
- Merge Sort
- Quick Sort
- Tree Insert / Find / e.t.c.

## Concepts
- Bit Manipulation
- Singleton Design Pattern
- Factory Design Pattern
- Memory (Stack vs. Heap)
- Recursion
- Big-O Time

## CS
- [Algorithms 4th ed.](http://www.amazon.com/Algorithms-4th-Robert-Sedgewick/dp/032157351X)
- [cool sorting visualization](https://www.youtube.com/watch?v=kPRA0W1kECg)

## Brain teasers

# Developer Tools

## Sublime

My favoriate text editor.

Pros:
  - light-weight
  - fast
  - powerful
  - customizable
  - did I say light-weight?

Cons:
  - no in-editor debugging (I think)
  - nothing else?

Keyboard shortcuts I like

  - http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/keyboard_shortcuts_osx.html

Key mappings I like
  - https://github.com/bohdon/sublimeAlternateVIMNavigation/blob/master/Default%20(OSX).sublime-keymap

Packages I like
  - http://www.hongkiat.com/blog/sublime-text-refresh-browser/
  - http://www.sitepoint.com/10-essential-sublime-text-plugins-full-stack-developer/

Other cool things:
  - https://scotch.io/bar-talk/best-of-sublime-text-3-features-plugins-and-settings
  - this whole thing is very good http://sublime-text-unofficial-documentation.readthedocs.org/

Some under the hood stuff
  - http://docs.sublimetext.info/en/latest/basic_concepts.html#the-packages-directory
  - fixed SublimeREPL node problem https://github.com/wuub/SublimeREPL/issues/364
Software engineering power tools
    - http://dsernst.com/2015/06/11/software-engineering-power-tools/

# Good tools

- [collabedit](http://collabedit.com)
- [online whiteboarding](https://awwapp.com)
- [randomizer](https://www.random.org/lists/)
- [regex builder]()
- [JSON prettifier]()
- [Angular dev tools]()
- [Backbone dev tools]()
- prototyping
  - [farmer.js](http://framerjs.com/)

# Cool sites

- [180 sites in 180 days](http://jenniferdewalt.com/)