var form = document.entry;
var table = document.getElementById('entriesTableId');

document.querySelector('#save').addEventListener('click', addRow);

function addRow() {
  var index = table.rows.length;
  var row = table.insertRow(index);

  var start = form.start.value;
  var end = form.end.value;
  var description = form.description.value;
  var tags = form.tags.value;

  row.insertCell(0).innerHTML = start;
  row.insertCell(1).innerHTML = end;
  row.insertCell(2).innerHTML = end - start; // TODO: add validation
  row.insertCell(3).innerHTML = description;
  row.insertCell(4).innerHTML = tags;

  // TODO: separate HTML out of JS
  row.insertCell(5).innerHTML = '<input type="button" value = "Delete" onClick="deleteRow(this)">';
  row.insertCell(6).innerHTML = '<input type="button" value = "Edit" onClick="editRow(this)">';

  // clear form
  //form.reset();
}

function deleteRow(cell) {
  var row = cell.parentNode.parentNode;
  var table = row.parentNode;
  var index = row.rowIndex;
  table.deleteRow(index);
}

function editRow(cell) {
  
}
