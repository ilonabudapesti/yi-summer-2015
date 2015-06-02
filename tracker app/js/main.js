var entries = [];

 function addEntry() {
 	var entry = {};
	entry.description = document.getElementById("test1").value;
	entry.tags = document.getElementById("tags1").value;
	entry.start = document.getElementById("start").value;
	entry.end = document.getElementById("end").value;
	entries.push(entry);
	console.log(entries);
	var stringifyArray = JSON.stringify(entryArray);
	var entriesContainer = document.getElementById("entriesContainer");
	var p = document.createElement ('p');
	var addArray = document.createTextNode(stringifyArray);
	p.appendChild(addArray);
	document.getElementById("entriesContainer").appendChild(p);


}



