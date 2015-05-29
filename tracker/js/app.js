$('document').ready( function () {

    var taskRow = $('.taskRow').clone();
    
    var taskList = [];

    // Save button
    $('body').on('click', '.btn-save', function (e) {
        
        var savedObject = {};

        var $inputParents = $(e.target).parents('tr').children();

        // Get input values
        savedObject.start = $inputParents.children('input:eq(0)').val();
        savedObject.stop = $inputParents.children('input:eq(1)').val();
        savedObject.description = $inputParents.children('input:eq(2)').val();
        savedObject.tags = $inputParents.children('input:eq(3)').val();
        
        taskList.push(savedObject);

        console.log(savedObject);
        console.log(taskList);

        // If saving the last row, add a new empty row
        if ( $(e.target).parents('.taskRow').is(':last-child') ) {
            $(e.target).parents('tbody').append( taskRow.clone() );
        }

        // Replace input fields with regular text values
        $inputParents.children('input:first').after(savedObject.start).remove();
        $inputParents.children('input:first').after(savedObject.stop).remove();
        $inputParents.children('input:first').after(savedObject.description).remove();
        $inputParents.children('input:first').after(savedObject.tags).remove();

        $(e.target).parents('.buttonTd').children('.btn-save').addClass('hidden');

    });




});