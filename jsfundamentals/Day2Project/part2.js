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

// Part 1a: Animal Relationship Data
console.log(profileAnimal.relationships.friends);
console.log(profileAnimal.relationships.matches);
profileAnimal.relationships.friends['duck'] = undefined;

// Part 2a: Log the Animals in a List
for (i=0; i<animals.length; i++) {
	console.log(animals[i].species + ": " + animals[i].tagline)
};

// Part 2a: Log the Animals in a List + numbered list

for (i=0; i<animals.length; i++) {
	console.log((i + 1) +". " + animals[i].species + ": " + animals[i].tagline)
};

// Part 2b: Filter Animals (extra credit)

for (i=0; i<animals.length; i++) 
	if (animals[i].species !== animals[0].relationships.friends[i] ) {
	console.log((i + 1) +". " + animals[i].species + ": " + animals[i].tagline)
};

// Scenario 3: Search and Add friends
var animalSearch = function (species) {
	for (var index in animals) {
		for ( var key in animals[index] ) {
			if (species === animals[index][key]) {
				console.log(animals[index]);
				return animals[index];
			}
		}
	}
};
findFriend = animalSearch('dog');

findFriend.relationships.friends.push("bird");

/* I've realized at this point that all relationships are referencing the
  original relationships object, and when I try to add a friend or match, 
  it does so for all other animals as well. According to the instructions
  as I understand it, I was supposed to loop through animals, nesting the
 relationship object inside each animal object. */

findFriend.relationships.matches.push("muskrat");

// Scenario 4: Edit Animal Profile Page

findFriend.species = "cat";
findFriend.noises = ['meow','nyan','purr','hiss'];
for (i=0;i<animals.length;i++) {
	animals[i].relationships.matches.push('alligator');
};
//Scenario 5: Edit Animal Collection Data

for (i=0;i<animals.length;i++) {
	animals[i].name = animals[i].species;
	delete animals[i].species;

}

//Wiping all friends lists only requires wiping one of the friends lists.
//I've elected not to do it so I have a little more feedback about previous
//changes I made.








