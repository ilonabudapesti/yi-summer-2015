var entries = [];
console.log('We start out with zero entries: ', entries);

function addEntry(form) {
  entries.push(parseEntry(form)); // we can pass in document.form[0] or document.entry
}

function editEntry(i, form) {
  entries[i] = parseEntry(form);
};

function deleteEntry(i) {
  entries.splice(i, 1);
};

function submit() {
  addEntry(document.entry);
  document.entry.reset();
  console.log('We added a new entry to our entries: ', entries);
}

// add event listener
document.querySelector('#save').addEventListener('click', submit);

// helpers start here
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

function addTable() {
  var table = document.createElement('table');
  table.border = '1';
  table.cellpadding = '2';

  for (var i = 0; i < entries.length; i++) {
    var tr = document.createElement('tr');
    
    for (var key in entries[i]) {
      var td = document.createElement('td');
      td.width = '75';
      td.appendChild(document.createTextNode(entries[i][key]));
      tr.appendChild(td);
    }
    
    table.appendChild(tr);

  }

}