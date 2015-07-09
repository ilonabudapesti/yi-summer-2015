var fs = require('fs');

var mergeData = (function() {
    var employees = null;
    var projects = null;
    var results = [];

    return function(e, p) {
        if( e ) {
            employees = e;
        }

        if( p ) {
            projects = p;
        }

        if( employees && projects ) {
            console.log('Merging results');

            var i;
            var len;
            var result;
            var resultLookup = {};

            for( i = 0, len = employees.length; i < len; i++ ) {
                if( employees[i].organization !== 'Remote Beta' ) {
                    continue;
                }

                result = {
                    id: employees[i].id,
                    name: employees[i].name,
                    projects: []
                };
                resultLookup[employees[i].id] = result;
                results.push(result);
            }

            for( i = 0, len = projects.length; i < len; i++ ) {
                if( !resultLookup.hasOwnProperty(projects[i].owner) ) {
                    continue;
                }

                result = resultLookup[projects[i].owner];
                result.projects.push({
                    id: projects[i].id,
                    name: projects[i].name
                });
            }

            printResults(results);
        }
    };
})();

var printResults = function(results) {
    var i = 0;
    var len = results.length;

    console.log('');
    for( ; i < len; i++ ) {
        console.log(results[i].name + ' has ' + results[i].projects.length + ' projects');
    }
    console.log('');
};

fs.readFile('employees.json', function(err, data) {
    if( err ) {
        console.log('Unable to open employees.json');
        return;
    }

    console.log('Employee data retrieved');
    var employees = JSON.parse(data).employees;

    mergeData(employees, null);
});

fs.readFile('projects.json', function(err, data) {
    if( err ) {
        console.log('Unable to open projects.json');
        return;
    }

    console.log('Project data retrieved');
    var projects = JSON.parse(data).projects;

    mergeData(null, projects);
});