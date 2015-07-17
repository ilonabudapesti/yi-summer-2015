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
