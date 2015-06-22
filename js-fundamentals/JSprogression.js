/*************************************************************
 * Ways of getting the value of a DOM element
*************************************************************/
==========================================================
































  // bracket notation of form and bracket notation of element
==========================================================


  document.forms["entry"][0].value;


  // dot notation of form and bracket notation of element
==========================================================


  document.entry[0].value;


  // dot notation of form and dot notation of element
==========================================================


  document.entry.start.value;


  // via native JS method using id
==========================================================


  document.getElementById("start").value;


  // via jQuery id selector and val method
==========================================================


  $('#start').val();


/*************************************************************
 * Ways of iterating through values of fields in a form
*************************************************************/
==========================================================
































  // for loop
  ==========================================================



    var entries1 = [];
    var entry1 = {};
    // loop through each input element but not the last one
    // which is the submit button
    for (var i = 0; i < document.entry.length-1; i++) {
      entry1[document.entry[i].name] = document.entry[i].value;
    }
    entries1.push(entry1);



  // Array.prototype.forEach
==========================================================



    var entries2 = [];
    var entry2 = {};
    document.entry.forEach(function(elem, i, arr) {
      if (elem.type !== 'button') {
        entry2[elem.name] = elem.value;
      }
    });



  // Array.prototype.every
==========================================================



    var entries3 = [];
    var entry3 = {};
    document.entry.every(function(elem, i, arr) {
      if (elem.type === 'button') {
        return false;
      } 
      // optional else syntax
      else {
        entry3[elem.name] = elem.value;
      }
      // optional return statement
      return true;
    });
    entries3.push(entry3);
  // home-made myEach
  function myEach(arr, callback) {

  }



  // underscore each
==========================================================





  // underscore reduce using nested array
==========================================================




  // underscore reduce using nested object not array
==========================================================



