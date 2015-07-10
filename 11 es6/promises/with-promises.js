var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

var promiseA = fs.readFileAsync('employees.json').done(JSON.parse);
var promiseB = fs.readFileAsync('projects.json').done(JSON.parse);

Promise.all([promiseA, promiseB])
  .then(function() {
    console.log("1");
  })
  .spread(function(employeeDB, projectDB){
    var employees = employeeDB.employees;
    var projects = projectDB.projects;

    return mergeData(employees, projects);
  })
  .then(printResults)
  .catch(function(reason) {
    console.log('Error! ', reason);
  })
  .done();


function printResults (results) {
    var i = 0;
    var len = results.length;

    console.log('');
    for( ; i < len; i++ ) {
        console.log(results[i].name + ' has ' + results[i].projects.length + ' projects');
    }
    console.log('');
}

function mergeData(employees, projects) {

  console.log('Merging results');

  var i;
  var len;
  var result;
  var results = [];
  var resultLookup = {};

  for (i = 0, len = employees.length; i < len; i++) {
    if (employees[i].organization !== 'YI') {
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
