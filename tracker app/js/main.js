var entries = [];
 var i = 0;

 function addEntry() {
 	var entry = {};
	entry.description = document.getElementById("description").value;
	entry.tags = document.getElementById("tags").value;
	entry.start = document.getElementById("start").value;
	entry.ends = document.getElementById("end").value;
	entries.push(entry);
		for (i; i < entries.length; i++) {	
			/*var stringifyArray =  entries[i].description + ", " + entries[i].tags+ ", "
			 + entries[i].start + ", " + entries[i].ends;
			var entriesContainer = document.getElementById("entriesContainer");
			var p = document.createElement ('p');
			var addArray = document.createTextNode(stringifyArray);
			p.appendChild(addArray);
			document.getElementById("entriesContainer").appendChild(p);
		*/
		};
	return i;

}

function generateTable() {
  var tableDiv = document.getElementById("tableContainer");
  var tbl = document.createElement("table");
  tbl.className ="table";
  var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");
    for (key in entries[i-1]) {
      var cell = document.createElement("td");
      cell.setAttribute("padding","1em");
      var cellText = document.createTextNode(entries[i-1][key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
   }
    // add the row to the end of the table body
  tblBody.appendChild(row);
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  tableDiv.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "1");
}

