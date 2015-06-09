//Use this file to implement Part One of your project

var animal = {};
animal.species = 'dog';
animal['tagline'] = 'ruhroh';
animal.noises = null;

var noiseArray = [];
noiseArray[0] = "bark";
noiseArray.push("woof");
noiseArray.splice(0,0,"yip");
console.log(noiseArray.length);
console.log(noiseArray.length-1);
noiseArray[3] = "growl";
var noizes = "noises";
animal[noizes] = noiseArray;


var animals = [];
animals.push(animal);
var quackers = {
	species: 'duck',
	tagline: 'Afflack',
	noises: ['quack', 'honk', 'sneeze', 'growl']
};
animals.splice(1,0,quackers);

animals[2] = {
	species: 'rabbit',
	tagline: "What's up, Doc?",
	noises : ['sniff', 'crunch', 'squeak', 'squeal']
	};

animals[3] = {
	species: 'bird',
	tagline: 'I tought I taw a puddy tat',
	noises: ['tweet', 'chirp', 'whistle', 'sing']
};

var friends = [];
friends.push(animals[0].species, animals[1].species);
relationships = {};
relationships["friends"] = friends;
var matches = [];
relationships['matches'] = matches;
matches.push('dog', 'bird', 'duck');

for(i=0; i<animals.length; i++) {
	animals[i].relationships = relationships;
};
