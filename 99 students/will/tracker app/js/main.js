var entries = [];
var i = 0;
 function addEntry() {

  var entry = {};
  entry.description = document.getElementById("description").value;
  entry.tags = document.getElementById("tags").value;
  entry.tags = entry.tags.split(",");
  entry.start = document.getElementById("start").value;
  entry.ends = document.getElementById("end").value;
  entries.push(entry);
  var tableDiv = document.getElementById("entriesTable");

    for (i; i<entries.length; i++) {
        var tbl = document.createElement("table");
        tbl.className ="table";
        var tblBody = document.createElement("tbody");
        var row = document.createElement("tr");

            for (key in entries[i]) {
                var cell = document.createElement("td");
                cell.setAttribute("padding","1em");
                var cellText = document.createTextNode(entries[i][key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("id","deleteButton" + i);
        deleteButton.innerHTML ="Delete Row";
        var cell2 = document.createElement("td");
        cell2.appendChild(deleteButton);
        row.appendChild(cell2);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
        tableDiv.appendChild(tbl);
        tbl.setAttribute("border", "1");
        tbl.setAttribute("id", "row" + i)
    }
var k = i-1;
 $( "#deleteButton"+ k).click(function() 
  {
    $('#row'+ k).remove();
    entries.splice($.inArray(entries), i);
  });

 return i;
}
/////

 // function each (collection, cb) {
 //      if (Array.isArray(collection)) {
 //     for (var i=0; i<collection.length; i++) {
     
 //          cb(collection[i], i, collection);
 //        }
 //      }c
 //      else {
 //        for (var key in collection) {
 //          cb(collection[key], key, collection);
 //           }        
 //        }
 //      }  
