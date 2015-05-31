var taskList = [];

$('document').ready( function () {



    // Get a clean copy of the <tr> elements for adding rows later 
    var taskRow = $('.taskRow').clone();
    var favoriteRow = $('.favoriteRow').clone();

    // Remove all rows from Favorite Activities table until some tags have been created
    $('.favoriteRow').remove();
    
    // Set default Start/Stop times to now
    $('.startInput').val( new Date().toString().slice(4,-18) );
    $('.stopInput').val( new Date().toString().slice(4,-18) );


    //          #######################
    //          #### BEGIN BUTTONS ####
    //          #######################

    // Save button
    $('body').on('click', '.btn-save', function (e) {
        
        var savedObject = {};

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Get input values, and store Start/Stop as Dates, Description as string, and Tags as array of strings
        savedObject.tags =    _.uniq( $inputParents.children('.tagInput').val().replace(' ', '').split(',') ); // Remove white space, and repeated tags
        savedObject.start = new Date( $inputParents.children('.startInput').val() );
        savedObject.stop =  new Date( $inputParents.children('.stopInput').val() );
        savedObject.description =     $inputParents.children('.descriptionInput').val();


        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        taskList[ index ] = _.clone( savedObject );

        console.log(savedObject);
        console.log(taskList);

        // If saving the last row, add a new empty row
        if ( $(e.target).parents('.taskRow').is(':last-child') ) {
            $(e.target).parents('tbody').append( taskRow.clone() );
            // Set default Start/Stop times to now
            $('.startInput').val( new Date().toString().slice(4,-18) );
            $('.stopInput').val( new Date().toString().slice(4,-18) );
        }

        // Replace <input> fields with <span> elements containing input values
        $inputParents.children('.tagInput').after('<span class="tagSpan">' + savedObject.tags.join(', ') + '</span>').remove();
        $inputParents.children('.durationSpan').html( getDurationMinutes( savedObject.start, savedObject.stop ) + ' minutes');
        $inputParents.children('.startInput').after('<span class="startSpan">' + savedObject.start.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('.stopInput').after('<span class="stopSpan">' + savedObject.stop.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('.descriptionInput').after('<span class="descriptionSpan">' + savedObject.description + '</span>').remove();

        // Hide Save button, and reveal Edit, Delete
        $(e.target).parents('.buttonTd').children('.btn-save').addClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-edit').removeClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-delete').removeClass('hidden');

        // Get new tag durations and update Favorite Activities table
        updateFavoriteActivities( getTagDurations() );

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

    });

    //          #######################
    //          ####  END BUTTONS  ####
    //          #######################

    //          #######################
    //          ####  BEGIN TAGS  #####
    //          #######################


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

        return returnArray;
    }

    // Take two native Date objects and return the duration in minutes
    function getDurationMinutes (start, stop) {
        return ( (stop / 1000) / 60 ) - ( (start / 1000) / 60 );
    }    

    // Update the Favorite Activities table
    function updateFavoriteActivities (tagDurations) {
        $('#favoriteActivitiesTable').children('tbody').children('.favoriteRow').remove();

        for (var i = tagDurations.length - 1; i >= 0; i--) {
            console.log(tagDurations[i].name, tagDurations[i].duration)
            $('#favoriteActivitiesTable').children('tbody').append( favoriteRow.clone() );
            $('.favoriteRow:last').children('td').remove()
            $('.favoriteRow:last').append('<td><span>' + tagDurations[i].name + '</span></td>');
            $('.favoriteRow:last').append('<td><span>' + tagDurations[i].duration + ' minutes' + '</span></td>');

        }
    }

    //          #######################
    //          #####  END TAGS  ######
    //          #######################


});



