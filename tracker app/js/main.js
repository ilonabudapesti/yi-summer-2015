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
			var stringifyArray =  entries[i].description + ", " + entries[i].tags+ ", "
			 + entries[i].start + ", " + entries[i].ends;
			var entriesContainer = document.getElementById("entriesContainer");
			var p = document.createElement ('p');
			var addArray = document.createTextNode(stringifyArray);
			p.appendChild(addArray);
			document.getElementById("entriesContainer").appendChild(p);

		};
	return i;

}



