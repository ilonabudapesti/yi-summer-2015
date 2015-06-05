//Any code in part1.js is still accessible in this file! 
//Try it out. See if you can console.log a variable from part1 (like animals) from this page.
console.log(animals);

var profileAnimal = animals[0];

// Part 1a: Log the Animal Personal Data
for (var key in profileAnimal) { 
	if (typeof profileAnimal[key] === "string") {
		console.log(key + ": " + profileAnimal[key])
	}
	else { console.log(key + ": " + "click here for more")
	};
};	

// Part 1a: Log the Animal Personal Data adjusted
for (var key in profileAnimal) { 
		if (typeof profileAnimal[key] === "object" &&
			Array.isArray(profileAnimal[key]) === false) {
			console.log(key + ": " + "click here for more");
			}
		else {
			console.log(key + ": " + profileAnimal[key]);		
		}
};	

// Part 1a Animal Relationship Data
