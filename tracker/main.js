// Ways of getting the value of a DOM element

  // bracket notation of form and bracket notation of element
  document.forms["entry"][0].value;
  // dot notation of form and bracket notation of element
  document.entry[0].value;
  // dot notation of form and dot notation of element
  document.entry.start.value;
  // via native JS method using id
  document.getElementById("start").value;
  // via jQuery id selector and val method
  $('#start').val();






// Basic interface and features
var entries = [];

// generic add that can be applied to any number of fields
function addEntry() {

}

function editEntry() {

};

function deleteEntry() {

};
