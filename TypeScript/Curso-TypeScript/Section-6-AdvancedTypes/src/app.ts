console.log('Console Union Types');
type Employee = {
    name: string;
    startDate : Date;
};

type Administrator = {
    name: string;
    privileges: string[];
};


type EmployeedAdministrator = Employee & Administrator;

const user: EmployeedAdministrator = {
    name: 'Spawn',
    startDate: new Date(),
    privileges: ['create-server']
}

/*Alernative widht interfaces*/

interface IEmployee {
    name: string;
    startDate : Date;
}

interface IAdministrator {
    name: string;
    privileges: string[];
}


interface IEmployeeAdministrator extends IEmployee, IAdministrator { }


const userImpl: IEmployeeAdministrator = {
    name: 'Spawn',
    startDate: new Date(),
    privileges: ['delete-server']
}


type Combinable = number | string;
type Numeric = number | boolean;

type Universal = Combinable | Numeric;

/*Guard for primitives*/
function add(a: number, b: number): number;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: string, b: string): string;
function add(param_a: Combinable, param_b: Combinable){
    if(typeof  param_a  == "number" && typeof param_b === "number"){
        return param_a + param_b;
    }
    return param_a.toString() + param_b.toString();
}

const fetchUserData = {
    id: 'id',
    name: 'Spawn',
    job: { title: 'CEO', description: 'I am de CEO'}
}


console.log(fetchUserData?.job?.title);




///*Guard for properties*/
//type UnknowEmployee = Employee | Administrator;
//function prinInfoIEmployeeAdministrator(emp: UnknowEmployee) {
//    console.log(emp.name);
//    if('privileges' in emp){
//        console.log(emp.privileges);
//    }
//    if('startDate' in emp){
//       console.log('StartDate' + emp.startDate );
//    }
//}
//
//prinInfoIEmployeeAdministrator({name: 'spawn', startDate: new Date()});
//
//
//class Car {
//    drive(){
//        console.log('It driving a car');
//    }
//}
//
//class Truck {
//    drive(){
//        console.log('Is drinving a Truck');
//    }
//
//    loadCargo(amount: number){
//        console.log('Loading ' + amount);
//    }
//}
//
//
//type Vehicule = Car | Truck;
//
//const veh_01 = new Car();
//const veh_02 = new Truck();
//
//
//function userVehicule (vehicule : Vehicule){
//    vehicule.drive();
//    if(vehicule instanceof Truck){
//        vehicule.loadCargo(1400);
//    }
//}
//
//userVehicule(veh_01);
//userVehicule(veh_02);
//
//
//interface Bird {
//    type: 'Bird';
//    flyingSpeed: number;
//}
//
//
//interface Horse {
//    type: 'Horse';
//    runningSpeed: number;
//}
//
//
//type Animal = Bird | Horse;
//
//function moveAnimal(animal: Animal){
//    let speed;
//    switch (animal.type) {
//        case "Bird":
//            speed = animal.flyingSpeed;
//            break
//        case "Horse":
//            speed = animal.runningSpeed;
//            break
//    }
//    console.log('Moving at speed ' + speed);
//}
//
//moveAnimal({type:'Bird', flyingSpeed: 10});
//
///*
//const paragraph = document.querySelector('p')!
//paragraph.innerText  = 'Spawn';
//*/
//
//const userInputElement = document.getElementById('user-input');
//
//
//if(userInputElement){
//    (userInputElement as HTMLInputElement).value = 'Star Lord';
//}
//
//
//interface ErrorContainer {
//    [prop: string]: string;
//}
//
//const errorBag: ErrorContainer = {
//    email: 'No a value email',
//    userName: 'Must start a capital character',
//    1: 'Soy el gato'
//
//}
//
//
//
