$('document').ready( function () {

    var taskRow = $('.task').clone();
    
    var taskList = [];

    $('html').on('click', '.btn-save', function (e) {
        
        var savedObject = {};

        var $inputParents = $(e.target).parents('tr').children();

        savedObject.start = $inputParents.children('input:eq(0)').val();
        savedObject.stop = $inputParents.children('input:eq(1)').val();
        savedObject.description = $inputParents.children('input:eq(2)').val();
        savedObject.tags = $inputParents.children('input:eq(3)').val();
        
        taskList.push(savedObject);

        console.log(savedObject);
        console.log(taskList);

        $(e.target).parents('tbody').append( taskRow.clone() );

        $inputParents.children('input:first').after(savedObject.start).remove();
        $inputParents.children('input:first').after(savedObject.stop).remove();
        $inputParents.children('input:first').after(savedObject.description).remove();
        $inputParents.children('input:first').after(savedObject.tags).remove();



    });


});