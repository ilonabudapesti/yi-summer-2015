// data store for entry objects
var entries = [];

// helper function that parses a form and returns an entry
function parseEntry(form) {
  var entry = {};
  form = Array.prototype.slice.call(form);
  form.forEach( function(elem) {
    if (elem.type !== 'button') {
      entry[elem.name] = elem.name === 'tags' ? elem.value.split(',') : elem.value ;
    }
  });
  return entry;
}

// core add, edit and delete features
function addEntry(form) {
  entries.push(parseEntry(form)); // we can pass in document.form[0] or document.entry
}

function editEntry(i, form) {
  entries[i] = entryMaker(form);
};

function deleteEntry(i) {
  entries.splice(i, 1);
};

// add event listener
function submit() {
  addEntry(document.entry);
  document.entry.reset();
  console.log(entries);
}
