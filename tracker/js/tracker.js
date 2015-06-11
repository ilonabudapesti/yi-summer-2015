var allEntries = [];
var entryID = 0;
var currentUser = FALSE; //no user logged in initally

var currentDateString = moment().format('YYYY-MM-DDTHH:mm');
$('#inputStart').val(currentDateString);
$('#inputEnd').val(currentDateString);

function Entry(start, end, description, tags)
{
	this.start = moment(start);
	this.end = moment(end);
	this.description = description;
	this.tags = tags.split(',');
	for(var i in this.tags)
	{ 
		this.tags[i] = this.tags[i].trim(); 
	}
	
	this.duration = Math.floor( Math.abs(this.end - this.start) / 60000 ); //convert to minutes
	this.id = ++entryID;
}

var addEntry = function() {
	var start = $('#inputStart').val();
	var end = $('#inputEnd').val();
	var description = $('#inputDescription').val();
	var tags = $('#inputTags').val();

	//Validate date before adding the entry
	if(moment(start).isValid() && moment(end).isValid()) {
		var newEntry = new Entry(start, end, description, tags);
		allEntries.push(newEntry);
		
		updateEntries();
		$('#entrySuccess').show();
		$('#dateWarning').hide();
	}
	else {
		//Throw error
		$('#dateWarning').show();
		$('#entrySuccess').hide();
	}
	
}

var removeEntry = function(element) {
	var removeID = $(element).closest('tr').data('entry-id');
   
	allEntries = $.grep(allEntries, function(entry) {
		return entry.id !== removeID;
	});
	
	$(element).closest('tr').hide(500);
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
		var startString = moment(this.start).format("MMM D, YYYY, h:mma"); 
		
		$('#entryRows').append('<tr data-entry-id="' 
			+ this.id + '"><td>' 
			+ startString + '</td><td>'  
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

	var startString = moment(editStart).format('YYYY-MM-DDTHH:mm'); 

	var endString = moment(editEnd).format('YYYY-MM-DDTHH:mm');

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
    		allEntries[i].start = moment(start);
			allEntries[i].end = moment(end);
			allEntries[i].description = description;
			allEntries[i].tags = tags.split(',');
			allEntries[i].duration = Math.floor( Math.abs(allEntries[i].end - allEntries[i].start) / 60000 ); 
    		break;
		}
	}

	updateEntries();
}

var buildStats = function() {
	var statsByDay = {};
	var statsByMonth = {};
	var statsByTag = {};

	for (var i in allEntries) {
		var startStringDay = moment(allEntries[i].start).format('YYYY-MM-DD');
		if(statsByDay[ startStringDay ] === undefined) {
			statsByDay[ startStringDay ] = allEntries[i].duration;
		}
        else statsByDay[ startStringDay ] += allEntries[i].duration;

        var startStringMonth = moment(allEntries[i].start).format('YYYY-MM');
        if(statsByMonth[ startStringMonth ] === undefined) {
        	statsByMonth[ startStringMonth ] = allEntries[i].duration;
        }
        else statsByMonth[ startStringMonth ] += allEntries[i].duration;
        
        for (var k in allEntries[i].tags) {
		    if(allEntries[i].tags[k] != "") {
		        if(statsByTag[ allEntries[i].tags[k] ] === undefined) {
		        	statsByTag[ allEntries[i].tags[k] ] = allEntries[i].duration;
		        }
		        else statsByTag[ allEntries[i].tags[k] ] += allEntries[i].duration;
		    }
	    }
	}

	//Empty By Day table rows
	$('#statsByDayRows').empty();
	$('#statsByDayRows').css("display","none");
	//Rebuild the By Day table from the statsByDay object
	$.each(statsByDay, function(key,value) {
		$('#statsByDayRows').append('<tr><td>' 
			+ key + '</td><td>' 
			+ value + '</td></tr>');
	});
	$('#statsByDayRows').show(500);

	//Empty By Month table rows
	$('#statsByMonthRows').empty();
	$('#statsByMonthRows').css("display","none");
	//Rebuild the By Month table from the statsByMonth object
	$.each(statsByMonth, function(key,value) {
		$('#statsByMonthRows').append('<tr><td>' 
			+ key + '</td><td>' 
			+ value + '</td></tr>');
	});
	$('#statsByMonthRows').show(500);

	//Empty By Tag table rows
	$('#statsByTagRows').empty();
	$('#statsByTagRows').css("display","none");
	//Rebuild the By Month table from the statsByMonth object
	$.each(statsByTag, function(key,value) {
		$('#statsByTagRows').append('<tr><td>' 
			+ key + '</td><td>' 
			+ value + '</td></tr>');
	});
	$('#statsByTagRows').show(500);
}

var registerNewUser = function() {
	var userInputName = $('#userInputName').val();
	var userInputEmail = $('#userInputEmail').val();
	userInputEmail = userInputEmail.toLowerCase();
	var userInputPassword = $('#userInputPassword').val();

	var userStorage = new Object();
	userStorage.name = userInputName;
	userStorage.password = userInputPassword;
	userStorage.entries = allEntries; //save current entries to the new user that is registering

	var userStorageJSON = JSON.stringify(userStorage);

	//Check if user already exists
	if (!localStorage.getItem(userInputEmail)) {
	  	localStorage.setItem(userInputEmail,userStorageJSON);
	}
}