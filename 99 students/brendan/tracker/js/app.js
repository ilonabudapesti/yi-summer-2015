// TODO: Refactor fadeOut/remove and fadeIn/append into functions

$('document').ready( function () {

    // Used by delete 
    // QUESTION: better to declare this at top of scope? or right above the function that uses it
    var animationInProgress = false;
    var animationSpeed = 700;

    // Store all tasks objects here
    var taskList = [];

    // Set up localStorage variable, and equalize for browsers that support only globalStorage
    var storage = getLocalStorage();
    var currentUser;

    // For use in Save/Edit handlers, replacing input with span and vice versa
    var fields = {
        tags: {
            $input: $('.tagInput').clone(),
            inputClass: '.tagInput',
            spanClass: '.tagSpan'
        },
        duration: {
            // no input here
            // or input class
            spanClass: '.durationSpan'
        },
        start : {
            $input: $('.startInput').clone(),
            inputClass: '.startInput',
            spanClass: '.startSpan'
        },
        stop : {
            $input: $('.stopInput').clone(),
            inputClass: '.stopInput',
            spanClass: '.stopSpan'
        },
        description : {
            $input: $('.descriptionInput').clone(),
            inputClass: '.descriptionInput',
            spanClass: '.descriptionSpan'
        }
    };


    //          #######################
    //----------####  BEGIN SETUP  ####----(Begin Section)---------------------------------------------------
    //          #######################

    // Get a clean copy of the <tr> elements for adding rows later 
    var $taskRow = $('.taskRow').clone();
    var $favoriteRow = $('.favoriteRow').clone();
    var $perDayRow = $('.perDayRow').clone();
    var $perMonthRow = $('.perMonthRow').clone();

    // Remove all rows from bottom tables until some tags have been created
    $('.favoriteRow').remove();
    $('.perDayRow').remove();
    $('.perMonthRow').remove();
    
    // Set default Start/Stop times to now
    $('.startInput').val( new Date().toString().slice(4,-18) );
    $('.stopInput').val( new Date().toString().slice(4,-18) );


    //          #######################
    //----------#####  END SETUP  #####----(End Section)---------------------------------------------------
    //          #######################

    //          #######################
    //----------#### BEGIN BUTTONS ####----(Begin Section)---------------------------------------------------
    //          #######################

    //                  - # - # - # - # - #
    //                  #   BEGIN SAVE    -     (Begin Subsection)
    //                  - # - # - # - # - #

    // Save button
    $('body').on('click', '.btn-save', function (e) {

        // If any animation is still in progress, do nothing
        if (animationInProgress) { return; }
        
        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        // Set newValues to current values if they exist, otherwise create an empty object
        var newValues = {};

        if ( ! taskList[index] ) { taskList[index] = {}; }

        // Determine which <td>'s contain <input>'s, and store any input in newValues
        $( e.target ).parents('.taskRow').children('td').each( function( index ) {
            
            // If the <td> contained an <input>, save that data to newValues; else, do nothing
            if ( $(this).children(':eq(0)')[0].tagName.toLowerCase() === 'input' ) {
                
                var input = $(this).children(':eq(0)').val();
                
                // Remove 'Td' from class name for a clean property name
                var key = this.className.slice(0,-2); 
                
                newValues[ key ] = input;       
            }
        });

        // Validate Start/Stop fields
        function isValidDate (inputDate, invalidMessage) {
            if (  ! Date.parse( inputDate )  ) {
                alert(invalidMessage); // Invalid 
                return false;
                // TODO: Reset input value to last valid input
            }
            return true; // Valid
        }

        // Validate and format newValues for insertion in taskList
        for (var key in newValues) {
            // Validate
            if ( key === 'start' && ! isValidDate( newValues[key], 'Invalid start date.' )) { return; } // Exit save function if invalid date
            if ( key === 'stop'  && ! isValidDate( newValues[key], 'Invalid stop date.' ))  { return; } // Exit save function if invalid date

            // Format
            if ( key === 'start' || key === 'stop') { 
                newValues[key] = new Date( newValues[key] ); 
            } else if ( key === 'tags') {
                newValues[key] = _.uniq( newValues[key].replace(' ', '').split(',') ); // Remove white space, and repeated tags
            }

            // Insert into taskList
            taskList[index][key] = newValues[key];

        }

        // Set calculated properties
        taskList[index].day =                          taskList[index].start.getDate();
        taskList[index].month =                        taskList[index].start.getMonth() + 1;
        taskList[index].duration = getDurationMinutes( taskList[index].start, taskList[index].stop );

        // Save taskList to user's space on localStorage if username exists, otherwise 'anon'
        if (currentUser) {
            updateUserInfo ( currentUser , { 'taskList' : taskList }  );
        } else {
            updateUserInfo ( 'anon' , { 'taskList' : taskList }  );
        }

        // If saving the last row, add a new empty row
        if ( $(e.target).parents('.taskRow').is(':last-child') ) {
            $(e.target).parents('tbody').append( $taskRow.clone() );
            // Set default Start/Stop times to now
            $('.startInput').val( new Date().toString().slice(4,-18) );
            $('.stopInput').val( new Date().toString().slice(4,-18) );
        }

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Replace <input> fields with <span> elements containing the user's input values
        // TODO: Refactor this (DRY) to a function inputToSpan with one parameter that matches the properties in the 'field' object
        $inputParents.children('.tagInput').after('<span class="tagSpan">' + taskList[index].tags.join(', ') + '</span>').remove();
        $inputParents.children('.durationSpan').html( taskList[index].duration + ' minutes');
        $inputParents.children('.startInput').after('<span class="startSpan">' + taskList[index].start.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('.stopInput').after('<span class="stopSpan">' + taskList[index].stop.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('.descriptionInput').after('<span class="descriptionSpan">' + taskList[index].description + '</span>').remove();

        // Hide Save button, and reveal Edit, Delete
        $(e.target).parents('.buttonTd').children('.btn-save').addClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-edit').removeClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-delete').removeClass('hidden');

        // Get new tag durations and update tally tables
        // TODO: Refactor this chunk into one function, updateFooterTables
        var currentDurations = getTagDurations();
        updateFavoriteActivitiesTable( currentDurations );
        updatePerDayTable( taskList );
        updateThisMonthTable( taskList );
    });

    //                  - # - # - # - # - #
    //                  #    END SAVE     -     (End Subsection)
    //                  - # - # - # - # - #

    //                  - # - # - # - # - #
    //                  #   BEGIN EDIT    -     (Begin Subsection)
    //                  - # - # - # - # - #

    // Replace spans with inputs containing the saved values
    function editField (field, e) {
        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();
        var $inputParents = $(e.target).parents('.taskRow').children();

        // Hide Edit button and reveal Save button
        $(e.target).parents('.taskRow').children('.buttonTd').children('.btn-edit').addClass('hidden');
        $(e.target).parents('.taskRow').children('.buttonTd').children('.btn-save').removeClass('hidden');

        if (field === 'duration') {
            $inputParents.children( fields[field].spanClass ).html( getDurationMinutes(taskList[index].start, taskList[index].stop ) + ' minutes' );
        } else {
            $inputParents.children( fields[field].spanClass ).after( fields[field].$input.clone() ).remove();
            $inputParents.children( fields[field].inputClass ).val( 
                // For Start and Stop fields, slice() before display
                field === 'start' || field === 'stop' ? taskList[index][field].toString().slice(4,-18) : taskList[index][field] 
                );
        }
    }

    // Edit button
    $('body').on('click', '.btn-edit', function (e) {

        // If any animation is still in progress, do nothing
        if (animationInProgress) { return; }

        // Run editField on all fields
        for (var field in fields) {
            editField(field, e); 
        }
    });

    // Edit on clicking field
    $('#trackerTable').on('click', 'td', function (e) {

        // If any animation is still in progress, do nothing
        if (animationInProgress) { return; }

        // If user clicked non-editable duration field, or buttons <td>, do nothing
        if ( e.target.className === 'durationTd' || $(e.target).parents('.durationTd')[0]  ) { return; }
        if ( e.target.className === 'buttonTd' || $(e.target).parents('.buttonTd')[0]  ) { return; }

        // If target is an <input>, or has an <input> as a child, do nothing
        if ( e.target.tagName === 'INPUT' || e.target.tagName === 'TD' &&  $( e.target ).children('input')[0] ) { return; }
        
        // Remove 'Td' from the end to get the proper field name
        var field = e.target.tagName === 'SPAN' ? $( e.target ).parents('td')[0].className.slice(0,-2) : e.target.className.slice(0,-2);

        // Execute edit functionality
        editField (field, e);
    });

    //                  - # - # - # - # - #
    //                  #    END EDIT     -     (End Subsection)
    //                  - # - # - # - # - #

    //                  - # - # - # - # - #
    //                  #  BEGIN DELETE   -     (Begin Subsection)
    //                  - # - # - # - # - #


    // Delete button
    $('body').on('click', '.btn-delete', function (e) {

        // If any animation is still in progress, do nothing
        if (animationInProgress) { return; }

        // Prevent a delete event from occuring until delete is complete (which would cause index problems and decouple view/model)
        // QUESTION: This is the first of problems that I vaguely expected by not coupling the
        //           view <tr> element to the data in taskList []. Should I have found some way 
        //           to include a unique identifier, connecting the HTML to the data? 
        animationInProgress = true;

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        // Remove data
        taskList.splice(index, 1);

        // Fade out row
        $(e.target).parents('.taskRow').fadeOut(animationSpeed, 'linear', function () { 
            // Delete in view
            $(e.target).parents('.taskRow').remove(); 
            // Delete is complete, allow the next delete event
            animationInProgress = false;
        });

        // Get new tag durations and update tally tables
        // TODO: Refactor this chunk into one function, updateFooterTables
        var currentDurations = getTagDurations();
        updateFavoriteActivitiesTable( currentDurations );
        updatePerDayTable( taskList );
        updateThisMonthTable( taskList );

    });

    //                  - # - # - # - # - #
    //                  #   END DELETE    -     (End Subsection)
    //                  - # - # - # - # - #

    //          #######################
    //----------####  END BUTTONS  ####----(End Section)-----------------------------------------------------
    //          #######################

    //          #######################
    //----------# BEGIN FOOTER TABLES #----(Begin Section)---------------------------------------------------
    //          #######################
    //
    //                  - # - # - # - # - #
    //                  #   BEGIN TAGS    -     (Begin Subsection)
    //                  - # - # - # - # - #

    function getTagDurations () {

        var durations = {};

        for (var i = 0; i < taskList.length; i++) {
            var currentDuration = getDurationMinutes( taskList[i].start, taskList[i].stop );
            for (var j = 0; j < taskList[i].tags.length; j++) {
                var currentTagName = taskList[i].tags[j];
                // Set key:val of durations object to tag:duration, and increment duration value on subsequent iterations
                durations[currentTagName] = durations[currentTagName] ? (durations[currentTagName] + currentDuration) : currentDuration ;
            }
        }

        // Convert to an array of {name: tagName, duration: 30} objects, for easier sorting
        var returnArray = [];
        for (var prop in durations) {
            returnArray.push( { 'name': prop, 'duration': durations[prop] } );
        }

        // Sort by duration, low to high
        returnArray = _(returnArray).sortBy('duration');

        return returnArray; //
    }

    // Take two native Date objects and return the duration in minutes
    function getDurationMinutes (start, stop) {
        return ( (stop / 1000) / 60 ) - ( (start / 1000) / 60 );
    }    

    // Update the Favorite Activities table
    function updateFavoriteActivitiesTable (tagDurations) {
        // Fade out current contents and then remove
        $('#favoriteActivitiesTable').children('tbody').children('.favoriteRow').fadeOut( animationSpeed / 2, 'linear', function () {
            this.remove();
        });
        // QUESTION: Why can't this work in the callback function above!?!? Great confusion.
        setTimeout( function () {
            for (var i = tagDurations.length - 1; i >= 0; i--) {
                // Insert a row clone
                $('#favoriteActivitiesTable').children('tbody').append( $favoriteRow.clone() );
                // Set display to none for upcoming fadeIn
                $('.favoriteRow:last').css('display', 'none');
                // Insert values
                $('.favoriteRow:last').children('td:eq(0)').html('<span>' + tagDurations[i].name + '</span>');
                $('.favoriteRow:last').children('td:eq(1)').html('<span>' + tagDurations[i].duration + '</span>');
                // Fade in
                $('.favoriteRow:last').fadeIn( animationSpeed / 2,'linear');
            }
        }, animationSpeed / 2 );
    }

    //                  - # - # - # - # - #
    //                  #    END TAGS     -     (End Subsection)
    //                  - # - # - # - # - #

    // Get data for and update the "Total Time Per Day" table
    function updatePerDayTable (taskList) {
        // Fade out current contents and then remove
        $('#perDayTable').children('tbody').children('.perDayRow').fadeOut( animationSpeed / 2, 'linear', function () {
            this.remove();
        });

        // Group by day of month
        var groupedByDay = _(taskList).groupBy('day');

        // Sum duration of all activities on each day
        var summed = []; 
        for (var prop in groupedByDay) {
            var sum = 0; // initialize or reset
            var month = groupedByDay[prop][0].month;
            for (var i = 0; i < groupedByDay[prop].length; i++) {
                sum += groupedByDay[prop][i].duration;
            }
            summed.push( { 'month': month, 'date': prop, 'summedDuration': sum } );
        }

        // Update the Total Time Per Day table
        setTimeout( function () {
            for (var i = 0; i < summed.length; i++) {
                 // Insert a row clone
                $('#perDayTable').children('tbody').append( $perDayRow.clone() );
                // Set display to none for upcoming fadeIn
                $('.perDayRow:last').css('display', 'none');
                // Insert values
                $('.perDayRow:last').children('td:eq(0)').html('<span>' + summed[i].month + '/' + summed[i].date + '</span>');
                $('.perDayRow:last').children('td:eq(1)').html('<span>' + summed[i].summedDuration + ' minutes' + '</span>');
                // Fade in
                $('.perDayRow:last').fadeIn( animationSpeed / 2,'linear');
            }
        }, animationSpeed / 2 );

    }

    // Get data for and update the "Total Time This Month" table
    function updateThisMonthTable (taskList) {

        // Get current month
        var currentMonth = new Date().getMonth() + 1;

        // Filter only tasks in current month, and reduce to get summed duration
        var summedMonthDuration = _(taskList).chain()
                                     .filter( function (obj) {return obj.month === currentMonth;} )
                                     .reduce( function(memo, val) {return memo + val.duration;} , 0 )
                                     .value();

        // Fade out and remove old rows
        $('#perMonthTable').children('tbody').children('.perMonthRow').fadeOut( animationSpeed / 2, 'linear', function () {
            this.remove();
        });

        setTimeout( function () {
            // Don't display anything if 0 duration
            if ( summedMonthDuration !== 0 ) {

                // Add new row with updated Total Time This Month
                $('#perMonthTable').children('tbody').append( $perMonthRow.clone() );
                // Set display to none for upcoming fadeIn
                $('.perMonthRow:last').css('display', 'none');
                // Insert values
                $('.perMonthRow:last').children('td').html('<span>' + summedMonthDuration + ' minutes' +'</span>');
                // Fade in
                $('.perMonthRow:last').fadeIn( animationSpeed / 2,'linear');
            }
        }, animationSpeed / 2 );
    }
        
    //          #######################
    //----------## END FOOTER TABLES ##----(End Section)-----------------------------------------------------
    //          #######################

    //          #######################
    //----------## BEGIN WEB STORAGE ##----(Begin Section)---------------------------------------------------
    //          #######################
    //


    // Equalizing for browsers that only support globalStorage (Zakas, p.785)
    function getLocalStorage() {
        if (typeof localStorage == 'object'){
            return localStorage;
        } else if (typeof globalStorage == 'object') {
            return globalStorage[location.host];
        } else {
            throw new Error('Local storage not available.');
        }
    }

    // Takes an existing username 'user' and an object 'update', and adds/overwrites the key:value pairs in
    // that username with those provided in 'update'
    function updateUserInfo (username, update) {
        // Parse and stringify must be used when setting/getting localStorage
        // If username does not have any existing data on localStorage, initialize as {}
        var currentInfo = JSON.parse(  storage.getItem(username)  ) || {};

        for (var prop in update) {
            currentInfo[prop] = update[prop];
        }

        storage.setItem( username, JSON.stringify( currentInfo ) );
    }



    // Create new user
    // QUESTION: the local var 'username' here, should I name it as I have? Ditto for the other local 
    //           version which is a parameter of isInvalidUsername? Does this get confusing when there
    //           is another version of 'username' declared higher up in the scope chain? or is this standard practice?
    $('body').on('click', '#btn-new', function (e) {

        var username,
            password;

        createNewUser();

        function createNewUser () {
            username = prompt('Please enter an username:');

            if ( isInvalidUsername(username) ) {
                username = undefined;
            } else {
                password = prompt('Please enter a password');
                updateUserInfo( username, {'password': password, 'taskList': [] } );
                alert('Success!\n Username: ' + username + '\n Password: ' + password + '\n Please sign in with your new credentials!' );
            }
        }

         // QUESTION: Are these names best kept to isPositive format (e.g. isValid)? Then negated if (! isValid)?
         //           the code: if (isInvalid) reads nicer to me than: if ( ! isValid). But I see merit in keeping
         //           all code in 'is' phrases to be positive/truthy... advice? conventions?
        function isInvalidUsername ( username ) {
            if ( username in storage ) {
                alert ('That username is already in use. Please try again.');
                return true;
            } else if (username === '' || username === null ) {
                alert ('Invalid username.');
                return true;
            } else {
                return false;
            }
        }
    });

    // Sign in
    $('body').on('click', '#btn-sign', function (e) {
        var username = prompt('Please enter your username:');
        var password;
        if ( ! storage[username] ) {
            alert('That username does not exist!');
            return;
        }
            
        password = prompt('Please enter your password:');

        if ( JSON.parse( storage[username] ).password === password ) {
            currentUser = username;
            alert('Success! You are now signed in.');
            loadLocalStorage( username );
        } else {
            alert('Incorrect password.');
        }

        function loadLocalStorage (username) {
            // Get taskList data from localStorage
            taskList = JSON.parse( storage[username] ).taskList;

            // Re-Date-ify these objects after stringify 
            for (var i = 0; i < taskList.length; i++) {
                taskList[i].start = new Date(taskList[i].start);
                taskList[i].stop = new Date(taskList[i].stop);
            }

            // Remove all rows
            $('#trackerTable tbody .taskRow').remove();

            // If there is at least 1 task in taskList, update the table
            if ( taskList.length ) { 

                for (i = 0; i < taskList.length; i++) {
                    $('#trackerTable tbody').append( $taskRow.clone() );

                    // TODO: Refactor this (DRY) to a function inputToSpan with one parameter that matches the properties in the 'field' object
                    $('#trackerTable tbody .taskRow:last td').children('.tagInput').after('<span class="tagSpan">' + taskList[i].tags.join(', ') + '</span>').remove();
                    $('#trackerTable tbody .taskRow:last td').children('.durationSpan').html( taskList[i].duration + ' minutes');
                    $('#trackerTable tbody .taskRow:last td').children('.startInput').after('<span class="startSpan">' + taskList[i].start.toString().slice(4,-18) + '</span>').remove();
                    $('#trackerTable tbody .taskRow:last td').children('.stopInput').after('<span class="stopSpan">' + taskList[i].stop.toString().slice(4,-18) + '</span>').remove();
                    $('#trackerTable tbody .taskRow:last td').children('.descriptionInput').after('<span class="descriptionSpan">' + taskList[i].description + '</span>').remove();
                 }
            // Else if there are no tasks in taskList, present a starting row
            } else {
                $('#trackerTable tbody').append( $taskRow.clone() );
                // Set default Start/Stop times to now
                $('.startInput').val( new Date().toString().slice(4,-18) );
                $('.stopInput').val( new Date().toString().slice(4,-18) );
            }

            // Get new tag durations and update tally tables
            // TODO: Refactor this chunk into one function, updateFooterTables
            var currentDurations = getTagDurations();
            updateFavoriteActivitiesTable( currentDurations );
            updatePerDayTable( taskList );
            updateThisMonthTable( taskList );

        }

    });


});