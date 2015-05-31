var taskList = [];

$('document').ready( function () {



    // Get a clean copy of the <tr> element for adding rows later 
    var taskRow = $('.taskRow').clone();
    
    // Set default Start/Stop times to now
    $('.taskRow:first td input:eq(0)').val( new Date().toString().slice(4,-18) );
    $('.taskRow:first td input:eq(1)').val( new Date().toString().slice(4,-18) );


    //          #######################
    //          #### BEGIN BUTTONS ####
    //          #######################

    // Save button
    $('body').on('click', '.btn-save', function (e) {
        
        var savedObject = {};

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Get input values, and store Start/Stop as Dates, Description as string, and Tags as array of strings
        savedObject.start = new Date( $inputParents.children('input:eq(0)').val() );
        savedObject.stop = new Date( $inputParents.children('input:eq(1)').val() );
        savedObject.description = $inputParents.children('input:eq(2)').val();
        // Remove white space, and repeated tags
        savedObject.tags = _.uniq( $inputParents.children('input:eq(3)').val().replace(' ', '').split(',') );

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        taskList[ index ] = _.clone( savedObject );

        console.log(savedObject);
        console.log(taskList);

        // If saving the last row, add a new empty row
        if ( $(e.target).parents('.taskRow').is(':last-child') ) {
            $(e.target).parents('tbody').append( taskRow.clone() );
            // Set default Start/Stop times to now
            $('.taskRow:last td input:eq(0)').val( new Date().toString().slice(4,-18) );
            $('.taskRow:last td input:eq(1)').val( new Date().toString().slice(4,-18) );
        }

        // Replace <input> fields with <span> elements containing input values
        $inputParents.children('input:first').after('<span>' + savedObject.start.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('input:first').after('<span>' + savedObject.stop.toString().slice(4,-18) + '</span>').remove();
        $inputParents.children('input:first').after('<span>' + savedObject.description + '</span>').remove();
        $inputParents.children('input:first').after('<span>' + savedObject.tags.join(', ') + '</span>').remove();

        // Hide Save button, and reveal Edit, Delete
        $(e.target).parents('.buttonTd').children('.btn-save').addClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-edit').removeClass('hidden');
        $(e.target).parents('.buttonTd').children('.btn-delete').removeClass('hidden');


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
        $inputParents.children('span:first').after('<input type="text" name="start">').remove();
        $inputParents.children('span:first').after('<input type="text" name="stop">').remove();
        $inputParents.children('span:first').after('<input type="text" name="description">').remove();
        $inputParents.children('span:first').after('<input type="text" name="tags">').remove();

        // use the index to pull the matching record from taskList data model, and enter into <input> fields
        $inputParents.children('input:eq(0)').val( taskList[index].start.toString().slice(4,-18) )
        $inputParents.children('input:eq(1)').val( taskList[index].stop.toString().slice(4,-18) )
        $inputParents.children('input:eq(2)').val( taskList[index].description )
        $inputParents.children('input:eq(3)').val( taskList[index].tags )

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


    function getDurationMinutes (start, stop) {
        return ( (stop / 1000) / 60 ) - ( (start / 1000) / 60 );
    }    

    //          #######################
    //          #####  END TAGS  ######
    //          #######################


});



