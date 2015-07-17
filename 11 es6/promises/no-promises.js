var fs = require('fs');

var mergeData = (function() {
  var employees;
  var projects;

  return function(e, p) {
    if (e) {
      employees = e.employees;
    }

    if (p) {
      projects = p.projects;
    }

    if (employees && projects) {

      // mergeYIData
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
      console.log('results is: ', results);
      printResults(results);
    }
  };


})();



function printResults (results) {
    var i = 0;
    var len = results.length;

    console.log('');
    for( ; i < len; i++ ) {
        console.log(results[i].name + ' has ' + results[i].projects.length + ' projects');
    }
    console.log('');
}

fs.readFile('employees.json', function(err, result){
  console.log('getting employees');
  if (err) {
    console.log('unable to read employees.json');
    return;
  }

  var employees = JSON.parse(result);

  mergeData(employees, null);

});

fs.readFile('projects.json', function(err, result){
  console.log('getting projects');
  if (err) {
    console.log('unable to read projects.json');
    return;
  }

  var projects = JSON.parse(result);

  mergeData(null, projects);

});

console.log('GO!');