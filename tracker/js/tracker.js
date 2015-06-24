var allEntries = [];
var entryID = 0;
var currentUser = false; //no user logged in initally

var currentDateString = moment().format('YYYY-MM-DDTHH:mm');
var currentDateStringPlusTen = moment().add(10, 'minutes').format('YYYY-MM-DDTHH:mm');
$('#inputStart').val(currentDateString);
$('#inputEnd').val(currentDateStringPlusTen);

function Entry(start, end, description, tags) {
    this.start = moment(start);
    this.end = moment(end);
    this.description = description;
    this.tags = tags.split(',');
    for (var i in this.tags) {
        this.tags[i] = this.tags[i].trim();
    }

    this.duration = Math.floor(Math.abs(this.end - this.start) / 60000); //convert to minutes
    this.id = ++entryID;
}

var addEntry = function() {
    var start = document.getElementById("inputStart").value;
    var end = document.getElementById("inputEnd").value;
    var description = document.getElementById("inputDescription").value;
    var tags = document.getElementById("inputTags").value;

    //Validate date before adding the entry
    if (moment(start).isValid() && moment(end).isValid()) {
        var newEntry = new Entry(start, end, description, tags);
        allEntries.push(newEntry);

        updateEntries();
        $('#entrySuccess').show();
        $('#dateWarning').hide();
    } else {
        //Throw error
        $('#dateWarning').show();
        $('#entrySuccess').hide();
    }

};

var removeEntry = function(element) {
    var removeID = $(element).closest('tr').data('entry-id');

    allEntries = $.grep(allEntries, function(entry) {
        return entry.id !== removeID;
    });

    $(element).closest('tr').hide(500);

    updateUser();
};

//Use handlebars to create template for entry rows
var entryRowSource = $("#entry-row-template").html();
var entryRowTemplate = Handlebars.compile(entryRowSource);

var updateEntries = function() {
    //If entries are present show table. Otherwise show no entry message.
    if (allEntries.length === 0) {
        $('#noEntryMessage').show();
        $('#entryTable').hide();
    } else {
        $('#noEntryMessage').hide();
        $('#entryTable').show();
    }

    //Empty table rows
    $('#entryRows').empty();


    //Rebuild the table from the allEntries array
    $.each(allEntries, function() {
        var thisEntry = this;
        thisEntry.startString = moment(this.start).format("MMM D, YYYY, h:mma");

        $('#entryRows').append( entryRowTemplate(thisEntry) );
    });

    buildStats();

    updateUser();
};

var editEntry = function(element) {
    var editStart;
    var editEnd;
    var editDescription;
    var editTags;
    var editID = $(element).closest('tr').data('entry-id');

    for (var i in allEntries) {
        if (allEntries[i].id === editID) {
            editStart = allEntries[i].start;
            editEnd = allEntries[i].end;
            editDescription = allEntries[i].description;
            editTags = allEntries[i].tags;
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
    $('#editSaveButton').attr('onclick', 'saveChanges(' + editID + ')');
};

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
            allEntries[i].duration = Math.floor(Math.abs(allEntries[i].end - allEntries[i].start) / 60000);
            break;
        }
    }

    updateEntries();
};

//TODO: replace with templating
var buildStatsByGroup = function (statGroupId, statsCollection) {
    $(statGroupId).empty();
    $(statGroupId).hide();
    //Rebuild the By Day table from the statsByDay object
    $.each(statsCollection, function(key, value) {
        $(statGroupId).append('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
    });
    $(statGroupId).show(500);
};

var buildStats = function() {
    var statsByDay = {};
    var statsByMonth = {};
    var statsByTag = {};

    for (var i in allEntries) {
        var startStringDay = moment(allEntries[i].start).format('YYYY-MM-DD');
        if (statsByDay[startStringDay] === undefined) {
            statsByDay[startStringDay] = allEntries[i].duration;
        } else statsByDay[startStringDay] += allEntries[i].duration;

        var startStringMonth = moment(allEntries[i].start).format('YYYY-MM');
        if (statsByMonth[startStringMonth] === undefined) {
            statsByMonth[startStringMonth] = allEntries[i].duration;
        } else statsByMonth[startStringMonth] += allEntries[i].duration;

        for (var k in allEntries[i].tags) {
            if (allEntries[i].tags[k] !== "") {
                if (statsByTag[allEntries[i].tags[k]] === undefined) {
                    statsByTag[allEntries[i].tags[k]] = allEntries[i].duration;
                } else statsByTag[allEntries[i].tags[k]] += allEntries[i].duration;
            }
        }
    }

    buildStatsByGroup('#statsByDayRows',statsByDay);
    buildStatsByGroup('#statsByMonthRows',statsByMonth);
    buildStatsByGroup('#statsByTagRows',statsByTag);
};

var registerNewUser = function() {
    var userInputName = $('#userInputName').val();
    var userInputEmail = $('#userInputEmail').val();
    userInputEmail = userInputEmail.toLowerCase();
    var userInputPassword = $('#userInputPassword').val();

    var userStorage = {};
    userStorage.name = userInputName;
    userStorage.password = userInputPassword;
    userStorage.entries = allEntries; //save current entries to the new user that is registering

    var userStorageJSON = JSON.stringify(userStorage);

    //Check if user already exists
    if (!localStorage.getItem(userInputEmail)) {
        localStorage.setItem(userInputEmail, userStorageJSON);
    }

    //Log the new user in
    currentUser = userInputEmail;

    $("#loggedOutNav").hide();
    $("#loggedInNav p").html('Welcome, ' + userInputName + '!');
    $("#loggedInNav").show();
};

var updateUser = function() {
    if (currentUser) {
        var userStorageJSON = localStorage.getItem(currentUser);
        var userStorage = JSON.parse(userStorageJSON);

        userStorage.entries = allEntries;

        userStorageJSON = JSON.stringify(userStorage);

        localStorage.setItem(currentUser, userStorageJSON);
    }
};

var logOut = function() {
    currentUser = false;
    $("#loggedOutNav").show();
    $("#loggedInNav").hide();

    allEntries = [];
    updateEntries();
};

var logIn = function() {
    var logInEmail = $('#logInEmail').val();
    logInEmail = logInEmail.toLowerCase();
    var logInPass = $('#logInPass').val();

    if (localStorage.getItem(logInEmail)) {
        var userStorageJSON = localStorage.getItem(logInEmail);
        var userStorage = JSON.parse(userStorageJSON);

        if (userStorage.password === logInPass) {
            //Log the verified user in
            currentUser = logInEmail;
            allEntries = userStorage.entries;

            $("#loggedOutNav").hide();
            $("#loggedInNav p").html('Welcome, ' + userStorage.name + '!');
            $("#loggedInNav").show();

            updateEntries();
        }
    }
};
