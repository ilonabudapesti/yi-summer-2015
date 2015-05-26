var allEntries = [];
var entryID = 0;

var dateTimeNow = new Date();
var currentDateString = dateTimeNow.toISOString();
currentDateString = currentDateString.substring(0, currentDateString.length-8);
$('#inputStart').val(currentDateString);
$('#inputEnd').val(currentDateString);

function Entry(start, end, description, tags)
{
	this.start = new Date(start);
	this.end = new Date(end);
	this.description = description;
	this.tags = tags.split(',');
	
	this.duration = Math.floor( Math.abs(this.end - this.start) / 60000 ); //convert to minutes
	this.id = ++entryID;
}

var addEntry = function() {
	var start = $('#inputStart').val();
	var end = $('#inputEnd').val();
	var description = $('#inputDescription').val();
	var tags = $('#inputTags').val();
	
	var newEntry = new Entry(start, end, description, tags);
	allEntries.push(newEntry);
	
	updateEntries();
}

var removeEntry = function(element) {
	var removeID = $(element).closest('tr').data('entry-id');
   
	allEntries = $.grep(allEntries, function(entry) {
		return entry.id !== removeID;
	});
	
	updateEntries();
}

var updateEntries = function() {
	//If entries are present show table. Otherwise show no entry message.
	if(allEntries.length === 0) {
		$('#noEntryMessage').show();
		$('#entryTable').hide();
	}
	else
	{
		$('#noEntryMessage').hide();
		$('#entryTable').show();
	}
	
	//Empty table rows
	$('#entryRows').empty();
	
	//Rebuild the table from the allEntries array
	$.each(allEntries, function() {
		$('#entryRows').append('<tr data-entry-id="' 
			+ this.id + '"><td>' 
			+ this.start.toISOString() + '</td><td>' 
			+ this.end.toISOString() + '</td><td>' 
			+ this.duration + '</td><td>' 
			+ this.description + '</td><td>' 
			+ this.tags + '</td><td>'
			+ '<button style="float:none;" onclick="editEntry(this)" type="button" class="close" aria-label="Close" data-toggle="modal" data-target="#modalEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>&nbsp;'
			+ '<button style="float:none;" onclick="removeEntry(this)" type="button" class="close" aria-label="Close"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>');
	});

	buildStats();
}

var editEntry = function(element) {
	var editID = $(element).closest('tr').data('entry-id');
	
	for (var i in allEntries) {
		if (allEntries[i].id === editID) {
    		var editStart = allEntries[i].start;
			var editEnd = allEntries[i].end;
			var editDescription = allEntries[i].description;
			var editTags = allEntries[i].tags;
    		break;
		}
	}

	var startString = editStart.toISOString();
	startString = startString.substring(0, startString.length-8);

	var endString = editEnd.toISOString();
	endString = endString.substring(0, endString.length-8);

	//set current values and onclick action for entry
	$('#editStart').val(startString);
	$('#editEnd').val(endString);
	$('#editDescription').val(editDescription);
	$('#editTags').val(editTags.toString());
	$('#editSaveButton').attr('onclick','saveChanges(' + editID + ')');


}

var saveChanges = function(editID) {
	//Get new values
	var start = $('#editStart').val();
	var end = $('#editEnd').val();
	var description = $('#editDescription').val();
	var tags = $('#editTags').val();

	//Save new values to replace existing entry
	for (var i in allEntries) {
		if (allEntries[i].id === editID) {
    		allEntries[i].start = new Date(start);
			allEntries[i].end = new Date(end);
			allEntries[i].description = description;
			allEntries[i].tags = tags.split(',');
			allEntries[i].duration = Math.floor( Math.abs(allEntries[i].end - allEntries[i].start) / 60000 ); 
    		break;
		}
	}

	updateEntries();
}

var buildStats = function() {
	var statsByDay = [];
	var statsByMonth = [];
	var statsByTag = [];

	for (var i in allEntries) {
		var startStringDay = allEntries[i].start.toISOString();
		startStringDay = startStringDay.substring(0, startStringDay.length-14);
		if(statsByDay[ startStringDay ] === undefined) {
			statsByDay[ startStringDay ] = allEntries[i].duration;
		}
        else statsByDay[ startStringDay ] += allEntries[i].duration;

        var startStringMonth = allEntries[i].start.toISOString();
		startStringMonth = startStringMonth.substring(0, startStringMonth.length-17);
        if(statsByMonth[ startStringMonth ] === undefined) {
        	statsByMonth[ startStringMonth ] = allEntries[i].duration;
        }
        else statsByMonth[ startStringMonth ] += allEntries[i].duration;

        if(statsByTag[ allEntries[i].tags ] === undefined) {
        	statsByTag[ allEntries[i].tags ] = allEntries[i].duration;
        }
        else statsByTag[ allEntries[i].tags ] += allEntries[i].duration;
	}
}