$('document').ready( function () {

    var taskRow = $('.taskRow').clone();
    
    var taskList = [];

    // Save button
    $('body').on('click', '.btn-save', function (e) {
        
        var savedObject = {};

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Get input values
        savedObject.start = $inputParents.children('input:eq(0)').val();
        savedObject.stop = $inputParents.children('input:eq(1)').val();
        savedObject.description = $inputParents.children('input:eq(2)').val();
        savedObject.tags = $inputParents.children('input:eq(3)').val();

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        taskList[ index ] = _.clone( savedObject );

        console.log(savedObject);
        console.log(taskList);

        // If saving the last row, add a new empty row
        if ( $(e.target).parents('.taskRow').is(':last-child') ) {
            $(e.target).parents('tbody').append( taskRow.clone() );
        }

        // Replace <input> fields with <span> elements containing input values
        $inputParents.children('input:first').after('<span>' + savedObject.start + '</span>').remove();
        $inputParents.children('input:first').after('<span>' + savedObject.stop + '</span>').remove();
        $inputParents.children('input:first').after('<span>' + savedObject.description + '</span>').remove();
        $inputParents.children('input:first').after('<span>' + savedObject.tags + '</span>').remove();

        $(e.target).parents('.buttonTd').children('.btn-save').addClass('hidden');

    });

    // Edit button
    $('body').on('click', '.btn-edit', function (e) {

        var $inputParents = $(e.target).parents('.taskRow').children();

        // Un-hide save button
        $(e.target).parents('.buttonTd').children('.btn-save').removeClass('hidden');

        // Get the index relative to its .taskRow siblings
        var index = $(e.target).parents('.taskRow').index();

        // Replace <span> elements with <input> fields
        $inputParents.children('span:first').after('<input type="text" name="start">').remove();
        $inputParents.children('span:first').after('<input type="text" name="stop">').remove();
        $inputParents.children('span:first').after('<input type="text" name="description">').remove();
        $inputParents.children('span:first').after('<input type="text" name="tags">').remove();

        // use the index to pull the matching record from taskList data model, and enter into <input> fields
        $inputParents.children('input:eq(0)').val( taskList[index].start )
        $inputParents.children('input:eq(1)').val( taskList[index].stop )
        $inputParents.children('input:eq(2)').val( taskList[index].description )
        $inputParents.children('input:eq(3)').val( taskList[index].tags )



    });


});