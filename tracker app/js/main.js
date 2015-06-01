var myArray = [];

function startSave () {
	function saveData () {
	 	var entries = {};
		entries.description = document.getElementById("test1").value;
		entries.tags = document.getElementById("tags1").value;
		myArray.push(entries);
		console.log(myArray);
		return myArray;
	};
	saveData();
	return myArray;
}
