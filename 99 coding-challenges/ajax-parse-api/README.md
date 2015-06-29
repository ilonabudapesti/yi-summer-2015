## Parse API

* [signup](https://parse.com/signup) for a free account
* Don't worry about picking a kind of app, just go straight to your Dashboard: https://www.parse.com/account/keys
* copy and paste your `Application ID` into `app.js` right aftare `"X-Parse-Application-Id"`. You will need to enclose it with `""`
* copy and paste your `REST API Key` into `app.js` right aftare `"X-Parse-REST-API-Key"`. You will need to enclose it with `""`

## AJAX
In the `app.js` file provided:
* [ ] Send the provided tweet using a `POST` request to the Parse API.
* [ ] Retrieve that tweet using a `GET` request to the same url, & log it to the console.
  * Use the provided `url` variable as your request url, and assume you are sending & receiving JSON data.
  * Include success & error functions for **both**, which **log** the status of the request to the console.

## Extra credit

* [ ] Allow `GET` to take a callback
* [ ] Invoke `GET` asynchronously instead of synchronously 
  Hint: invoke inside the success callback of `POST`
