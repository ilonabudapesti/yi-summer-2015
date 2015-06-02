var start = document.getElementById("start").value;
var end = document.getElementById("end").value;
var energy = document.getElementById("energy").value;
var breakfast = document.getElementById("breakfast").value;

var workoutResults = [start, end, energy, breakfast];

function cloneRow() {
    var row = document.getElementById("originalRow"); // find row to copy
    var table = document.getElementById("myTable"); // find table to append to
    var clone = row.cloneNode(true); // copy children too
    clone.id = "cloneRow"; // change id or other attributes/contents
    table.appendChild(clone); // add new row to end of table
}

function deleteRow(t) {
    var row = t.parentNode.parentNode;
    document.getElementById("myTable").deleteRow(row.rowIndex);
}
