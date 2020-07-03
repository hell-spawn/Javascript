/*
class Person {
	name: string;
	private age: number;
	protected address: string;
	type: string = 'Young Guy';


	constructor(name: string, public birthDate: Date){
		this.name = name;
		this.age = 39;
		this.address = 'Calle Falsa 123';
	}

	printAge(){
		console.log(this.age);
		this.setType("Old Guy");
	}

	private setType(type: string){
		this.type = type;
		console.log(this.type);
	}
}

const person = new Person("Spawn", new Date("2019-10-01"));
console.log(person.name, person.birthDate);
person.printAge();


class Spawn extends Person {
	name = 'Al';
}

const spawn = new Spawn('Spawn', new Date('2019-10-21'));
console.log(spawn);
console.log(spawn.name);


class Plant {
	
	private _species: string = "Default";

	get species(){
		return this._species;
	}

	set species(value: string){
		if(value.length > 3){
			this._species = value;
		}else{
			this._species = "Default";
		}
	}
}

const plant = new Plant() ;
console.log(plant.species);
plant.species = "Green Plant";
console.log(plant.species);
plant.species = "No";
console.log(plant.species);


class 	Helpers {
	
	static PI: number = 3.14;

	static calcCircumference(diameter: number): number{
		return this.PI * diameter; 
	}
}

console.log(Helpers.PI);
console.log(Helpers.calcCircumference(2));
*/
