//Use this file to implement Part One of your project

var duck = { 
	species: 'duck', 
	tagline: 'Afflac', 
	noises: ['quack', 'honk', 'sneeze', 'growl']
};
// objKeyPrinter;

function objKeyPrinter(animal){
	var objNames = Object.getOwnPropertyNames(animal);
	var names = objNames.toString();
	return names;
};
// objValuePrinter

function objValuePrinter(animal) {
	var objNames = [];
	for (var key in animal) {
		if (typeof animal[key] === "string") {
			objNames.push(animal[key]);
		}
	}
	return objNames.join(" ");
};

function arrValuePrinter(animal){
	for (var key in animal) {
		if (Array.isArray(animal[key])) {
			return animal[key].join(" ");
		}
	}
};

function dataTypeChecker (animal) {
	
		if (Array.isArray(animal) === true) {
			return "array";
		}
		else {
			return "object";
		}
	}


function capitalizeVals (animal) {
	for (var key in animal) {
		if (typeof animal[key] === 'string') {
			capitalize(animal[key]);
		}
	}
	return animal;
}
function capitalize(str){
	str = str[0].toUpperCase() + str.slice(1);
	return str; 
			// var capital = animal[key].substr(0,1).toUpperCase();
			// var rest = animal[key].substr(1, animal[key][value].length-1);
			// var result = capital+rest;
}






// function search(word) {
// if (isNaN(cat.search(word)) === false) {
//  var find = cat.search(word);
//  var lookup = word.length;
// var result = find + "," +(find+lookup);
// }
// return result;
// }


