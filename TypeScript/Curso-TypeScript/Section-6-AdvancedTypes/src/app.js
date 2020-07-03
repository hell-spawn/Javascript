"use strict";
console.log('Console Union Types');
const user = {
    name: 'Spawn',
    startDate: new Date(),
    privileges: ['create-server']
};
const userImpl = {
    name: 'Spawn',
    startDate: new Date(),
    privileges: ['delete-server']
};
/*Guard for primitives*/
function add(param_a, param_b) {
    if (typeof param_a == "number" && typeof param_b === "number") {
        return param_a + param_b;
    }
    return param_a.toString() + param_b.toString();
}
function prinInfoIEmployeeAdministrator(emp) {
    console.log(emp.name);
    if ('privileges' in emp) {
        console.log(emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('StartDate' + emp.startDate);
    }
}
prinInfoIEmployeeAdministrator({ name: 'spawn', startDate: new Date() });
class Car {
    drive() {
        console.log('It driving a car');
    }
}
class Truck {
    drive() {
        console.log('Is drinving a Truck');
    }
    loadCargo(amount) {
        console.log('Loading ' + amount);
    }
}
const veh_01 = new Car();
const veh_02 = new Truck();
function userVehicule(vehicule) {
    vehicule.drive();
    if (vehicule instanceof Truck) {
        vehicule.loadCargo(1400);
    }
}
userVehicule(veh_01);
userVehicule(veh_02);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "Bird":
            speed = animal.flyingSpeed;
            break;
        case "Horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed ' + speed);
}
moveAnimal({ type: 'Bird', flyingSpeed: 10 });
/*
const paragraph = document.querySelector('p')!;
paragraph.innerText  = 'Spawn';
*/
const userInputElement = document.getElementById('user-input');
if (userInputElement) {
    userInputElement.value = 'Spawn';
}
