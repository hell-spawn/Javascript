console.log('Decorators It Works');


/*Decorador basico*/
/*
function Logger(constructor: Function) {
	console.log('Logging ....');
}
 */

/*Fabrica de decoradores ?*/
function LOGGER (logString: string){
	return (constructor: Function) => {
		console.log(logString);
		console.log(constructor);
	}
}

function WithTempleate(template: string, idElement: string) {
	return (constructor: any) => {
		const element = document.getElementById(idElement);
		const p = new constructor();
		if(element){
			element.innerHTML = template;
			element.querySelector('h1')!.textContent = p.name;
		}
	}
}

// Construntor decorardor runtime
function WithTempleate2(template: string, idElement: string) {
	console.log('Templeate Decorator');
	return function <T extends {new (...args: any[]): any}> (originalConstrunctor: T) {
		return class extends originalConstrunctor {
			constructor(..._: any[]) {
				super();
				const element = document.getElementById(idElement);
				if(element){
					element.innerHTML = template;
					element.querySelector('h1')!.textContent = this.name;
				}
			}
		};
	}
}


//@Logger //Decorador basico
//@LOGGER('LOGGING - PERSON')

//@WithTempleate('<h1></h1>', 'app')
@WithTempleate2('<h1></h1>', 'app')
class Person {

	private name: string;

	constructor() {
		this.name = 'Spawn';
		console.log('Creating person object');
	}
}

const per = new Person();

// ------------------

//Decorator
function Log(target: any, propertyName: string) {
	console.log('-> Property Decorator');
	console.log(target);
	console.log(propertyName);
}

function Log2(target: any, propertyName: string, description: PropertyDescriptor) {
	console.log('-> Accesor Decorator');
	console.log(target);
	console.log(propertyName);
	console.log(description);
}

function Log3(target: any, propertyName: string, description: PropertyDescriptor) {
	console.log('-> Method Decorator');
	console.log(target);
	console.log(propertyName);
	console.log(description);
}

function Log4(target: any, propertyName: string, position: number) {
	console.log('-> Parameter Decorator');
	console.log(target);
	console.log(propertyName);
	console.log(position);
}

// Class
class Product {

	@Log
	title: string;
	private _price: number;

	constructor(title: string, price: number) {
		this.title = title;
		this._price = price;
	}

	@Log2
	setPrice(price: number){
		if(price >= 0){
			this._price = price;
		} else {
			new Error('Ilegal Argument: price')
		}
	}


	@Log3
	getPriceWidthTax(@Log4 tax: number){
		return this._price * (1 + tax);
	}

}

// Ejemplo Decorador 

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
	const originaleMethod = descriptor.value;	
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get(){
			const boundFn = originaleMethod.bind(this);
			return boundFn;
		}
	};

	return adjDescriptor;
}


class Printer {
	message = 'It works..';

	@Autobind
	showMessage(){
		console.log(this.message);
	}
}

const p = new Printer();

const button = document.querySelector('button')!;

button.addEventListener('click', p.showMessage);


// Example Implementation Decorator validations

interface ValidatorConfig {
	[property: string]:{
		[validateProperty: string]: string[]
	}
}

const registerValidators : ValidatorConfig = {};

function Required(target: any, propertyName: string) {
	console.dir(registerValidators);
	registerValidators[target.constructor.name] = {
		...registerValidators[target.constructor.name],
		[propertyName]:['required']
	};	
		
}

function PositiveNumber(target: any, propertyName: string) {
	console.dir(registerValidators);
	registerValidators[target.constructor.name] = {
		...registerValidators[target.constructor.name],
		[propertyName]:['positive-number']
	};	
}

function validate(obj: any) {
	const objValidatorConfig = registerValidators[obj.constructor.name];	
	if(!objValidatorConfig){
		return true;
	}
	var isValid = true;	
	for (var prop in objValidatorConfig) {
		console.log('Value prop');
		console.log(prop);
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case 'required':
					isValid = isValid && !!obj[prop];
					break;
				case 'positive-number':
					isValid = isValid && obj[prop] > 0;
				default:

			}
		}
	}
	return isValid;
}


class Course {
	@Required
	title: string;

	@PositiveNumber
	price: number;

	constructor(title: string, price: number){
		this.title = title;
		this.price = price;
	}

}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const titleEl = document.getElementById('title') as HTMLInputElement;
	const priceEl = document.getElementById('price') as HTMLInputElement;

	const title = titleEl.value;
	const price = +priceEl.value;

	const newCourse = new Course(title, price);
	if (!validate(newCourse)) {
		console.log('No valid Course');				
	}
	console.log(newCourse);
});



