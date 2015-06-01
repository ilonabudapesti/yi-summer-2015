// Outside of document.ready for console access and easy testing/debugging
var taskList = [];

$('document').ready( function () {

    //          #######################
    //----------####  BEGIN SETUP  ####----(Begin Section)---------------------------------------------------
    //          #######################

    // Get a clean copy of the <tr> elements for adding rows later 
    var taskRow = $('.taskRow').clone();
    var favoriteRow = $('.favoriteRow').clone();
    var perDayRow = $('.perDayRow').clone();
    var perMonthRow = $('.perMonthRow').clone();

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

    // Save button
    $('body').on('click', '.btn-save', function (e) {
        
        // These will be stored in the array taskList
        var savedObject = {};

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Get input values, and store Start/Stop as Dates, Description as string, and Tags as array of strings
        savedObject.tags =    _.uniq( $inputParents.children('.tagInput').val().replace(' ', '').split(',') ); // Remove white space, and repeated tags
        savedObject.start = new Date( $inputParents.children('.startInput').val() );
        savedObject.stop =  new Date( $inputParents.children('.stopInput').val() );
        savedObject.description =     $inputParents.children('.descriptionInput').val();
        savedObject.day =   savedObject.start.getDate();
        savedObject.month = savedObject.start.getMonth() + 1;
        savedObject.duration = getDurationMinutes(savedObject.start, savedObject.stop);

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        // Insert a non-referenced clone of savedObject into taskList array
        taskList[ index ] = _.clone( savedObject );

        // Simple logs for viewing and making sure data is saving properly
        console.log("Just saved: ", savedObject);
        console.log("taskList now contains: ", taskList);

        // If saving the last row, add a new empty row
        if ( $(e.target).parents('.taskRow').is(':last-child') ) {
            $(e.target).parents('tbody').append( taskRow.clone() );
            // Set default Start/Stop times to now
            $('.startInput').val( new Date().toString().slice(4,-18) );
            $('.stopInput').val( new Date().toString().slice(4,-18) );
        }

        // Replace <input> fields with <span> elements containing the user's input values
        $inputParents.children('.tagInput').after('<span class="tagSpan">' + savedObject.tags.join(', ') + '</span>').remove();
        $inputParents.children('.durationSpan').html( getDurationMinutes( savedObject.start, savedObject.stop ) + ' minutes');
        $inputParents.children('.startInput').after('<span class="startSpan">' + savedObject.start.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('.stopInput').after('<span class="stopSpan">' + savedObject.stop.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('.descriptionInput').after('<span class="descriptionSpan">' + savedObject.description + '</span>').remove();

        // Hide Save button, and reveal Edit, Delete
        $(e.target).parents('.buttonTd').children('.btn-save').addClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-edit').removeClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-delete').removeClass('hidden');

        // Get new tag durations and update tally tables
        var currentDurations = getTagDurations();
        updateFavoriteActivitiesTable( currentDurations );
        updatePerDayTable( taskList );
        updateThisMonthTable( taskList );

    });

    // Edit button
    $('body').on('click', '.btn-edit', function (e) {

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Hide Edit button and reveal Save button
        $(e.target).parents('.buttonTd').children('.btn-edit').addClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-save').removeClass('hidden');

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        // Replace <span> elements with <input> fields
        $inputParents.children('.tagSpan').after('<input class="tagInput" type="text" name="tags">').remove();
        $inputParents.children('.startSpan').after('<input class="startInput wid-110" type="text" name="start">').remove();
        $inputParents.children('.stopSpan').after('<input class="stopInput wid-110" type="text" name="stop">').remove();
        $inputParents.children('.descriptionSpan').after('<input class="descriptionInput wid-180" type="text" name="description">').remove();

        // use the index to pull the matching record from taskList data model, and enter into <input> fields
        $inputParents.children('.tagInput').val( taskList[index].tags );
        $inputParents.children('.durationSpan').html( getDurationMinutes(taskList[index].start, taskList[index].stop ) + ' minutes' );
        $inputParents.children('.startInput').val( taskList[index].start.toString().slice(4,-18) );
        $inputParents.children('.stopInput').val( taskList[index].stop.toString().slice(4,-18) );
        $inputParents.children('.descriptionInput').val( taskList[index].description );
        

    });

    // Delete button
    $('body').on('click', '.btn-delete', function (e) {

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        // Remove row
        $(e.target).parents('.taskRow').remove();

        // Remove data
        taskList.splice(index, 1);

        // Get new tag durations and update tally tables
        var currentDurations = getTagDurations();
        updateFavoriteActivitiesTable( currentDurations );
        updatePerDayTable( taskList );
        updateThisMonthTable( taskList );

    });

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
        for (prop in durations) {
            returnArray.push( { 'name': prop, 'duration': durations[prop] } )
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
        $('#favoriteActivitiesTable').children('tbody').children('.favoriteRow').remove();

        for (var i = tagDurations.length - 1; i >= 0; i--) {
            $('#favoriteActivitiesTable').children('tbody').append( favoriteRow.clone() );
            $('.favoriteRow:last').children('td').remove()
            $('.favoriteRow:last').append('<td><span>' + tagDurations[i].name + '</span></td>');
            $('.favoriteRow:last').append('<td><span>' + tagDurations[i].duration + ' minutes' + '</span></td>');

        }
    }

    //                  - # - # - # - # - #
    //                  #    END TAGS     -     (End Subsection)
    //                  - # - # - # - # - #

    // Get data for and update the "Total Time Per Day" table
    function updatePerDayTable (taskList) {
        $('#perDayTable').children('tbody').children('.perDayRow').remove();

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
        for (var i = 0; i < summed.length; i++){
            $('#perDayTable').children('tbody').append( perDayRow.clone() );
            $('.perDayRow:last').children('td').remove()
            $('.perDayRow:last').append('<td><span>' + summed[i].month + '/' + summed[i].date + '</span></td>');
            $('.perDayRow:last').append('<td><span>' + summed[i].summedDuration + ' minutes' + '</span></td>'); 
        }
    }

    // Get data for and update the "Total Time This Month" table
    function updateThisMonthTable (taskList) {

        // Get current month
        var currentMonth = new Date().getMonth() + 1;

        // Filter only tasks in current month, and reduce to get summed duration
        var summedMonthDuration = _(taskList).chain()
                                     .filter( function (obj) {return obj.month === currentMonth} )
                                     .reduce( function(memo, val) {return memo + val.duration} , 0 )
                                     .value();

        // Remove old row
        $('#perMonthTable').children('tbody').children('.perMonthRow').remove();

        // Don't display anything if 0 duration
        if ( summedMonthDuration !== 0 ) {
            // Add new row with updated Total Time This Month
            $('#perMonthTable').children('tbody').append( perMonthRow.clone() );
            $('.perMonthRow:last').children('td').html('<span>' + summedMonthDuration + ' minutes' +'</span>');
        }


    }
        
    //          #######################
    //----------## END FOOTER TABLES ##----(End Section)-----------------------------------------------------
    //          #######################


});



