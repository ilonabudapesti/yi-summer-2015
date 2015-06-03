var start = [];    // as object, array holds all of the objects
var end = [];
var energy = [];
var breakfast = [];
var tags = [];

function myFunction() { //store objects into array
    var workoutResults = [{
        start: push(document.getElementById("start").value),
        end: push(document.getElementById("end").value),
        energy: push(document.getElementById("energy").value),
        breakfast: push(document.getElementById("breakfast").value),
        tags: push(document.getElementById("tags").value),
    }];
}

function cloneRow() { //clone row function
    var row = document.getElementById("originalRow"); // find row to copy
    var table = document.getElementById("myTable"); // find table to append to
    var clone = row.cloneNode(true); // copy children too
    clone.id = "cloneRow"; // change id or other attributes/contents
    table.appendChild(clone); // add new row to end of table
}

function deleteRow(t) { //delete row function
    var row = t.parentNode.parentNode;
    document.getElementById("myTable").deleteRow(row.rowIndex);
}

//test function
 var number = [];

function testFunction() {
        var x = document.getElementById("box");
        number.push(document.getElementById("input").value);
        x.innerHTML = number.join('<br/>');
    }
//end test function
