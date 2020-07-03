interface NamedPerson {
	fristName: string;
	age?: number;
	[propName: string]: any;
	greet(lastName: string): void;

}


function greet(person: NamedPerson) {
	console.log("Hello, " + person.fristName);
}


function changeName(person: NamedPerson) {
	person.fristName = "Spawn";
}

const person: NamedPerson ={
	fristName: "All",
	age: 32,
	hobbies: ["Cooking", "Sports"],
	greet(lastName: string){
		console.log("Hi, I am " + this.fristName + " " + lastName);
	}
} ;

greet(person);
changeName(person);
greet(person);
person.greet("Anything");


class Person implements NamedPerson {
	fristName: string;
	lastName: string;
	greet(lastName: string): void{
		console.log("Hi, I am " + this.fristName + " " + lastName);
	};
}


const myPerson = new Person();
myPerson.fristName = "Hell Spawn";
myPerson.lastName = " Anything";
myPerson.greet(myPerson.lastName);


// Functions interface

interface DoubleValue {
	(value1: number, value2: number):number;
}


let myFunction: DoubleValue;

myFunction = function(number1: number, number2: number) {
	return (number1 + number2) * 2;
};
console.log(myFunction(10, 20));
