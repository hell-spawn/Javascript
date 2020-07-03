console.log('It Wroks ... ');

function add(num1: number, num2: number) {
    if(typeof  num1 !== 'number' || typeof num2 !== 'number'){
        throw new Error("Incorrect Input");
    }
}

const num1 = 5;
const num2 =  23.5;

const result = add(num1, num2);
console.log(result);
