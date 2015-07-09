var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(fs);

Promise.all([
        fs.readFileAsync('employees.json').then(JSON.parse),
        fs.readFileAsync('projects.json').then(JSON.parse)
    ])
    .spread(mergeResults)
    .then(printResults)
    .catch(console.error); // .done()

function mergeResults(employeeDB, projectDB) {
    var employees = employeeDB.employees;
    var projects = projectDB.projects;

    console.log('Merging results');

    var i;
    var len;
    var result;
    var resultLookup = {};
    var results = [];

    for (i = 0, len = employees.length; i < len; i++) {
        if (employees[i].organization !== 'Remote Beta') {
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

    for (i = 0, len = projects.length; i < len; i++) {
        if (!resultLookup.hasOwnProperty(projects[i].owner)) {
            continue;
        }

        result = resultLookup[projects[i].owner];
        result.projects.push({
            id: projects[i].id,
            name: projects[i].name
        });
    }

    return results;
}

function printResults(results) {
    var i = 0;
    var len = results.length;

    console.log('');
    for( ; i < len; i++ ) {
        console.log(results[i].name + ' has ' + results[i].projects.length + ' projects');
    }
    console.log('');
}