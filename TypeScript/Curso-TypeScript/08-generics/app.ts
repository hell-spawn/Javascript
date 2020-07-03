// Simple Generics

function echo(data: any) {
	return data;
}

console.log(echo("Spawn"));
console.log(echo(27));
console.log(echo({name: "Spawn", age: 27}));


// Better Generics

function betterEcho<T>(data: T) {
	return data;
}

console.log(betterEcho("Spawn"));
console.log(betterEcho(27));
console.log(betterEcho({name: "Spawn", age: 27}));


// Built-in Generics

const testResults: Array<number> = [1.94, 2.33];
//testResults.push("Spawn"); //'"Spawn"' is not assignable to parameter of type 'number'.
testResults.push(-.099);
console.log(testResults);

// Arrays

function printAll<T>(data: T[]) {
	data.forEach(element => console.log(element));
}

printAll<string>(["Apple", "banana"]);


// Generics Types

const echo2: <T>(data: T) => T = betterEcho;
console.log(echo2<string>("Something"));


// Generic Class
/*
class SimpleMath<T> {
	baseValue: T;
	multiplyValue: T;
	calculate(): number {
		return +this.baseValue * +this.multiplyValue;
	}
}

const simpleMath = new SimpleMath<number>();
simpleMath.baseValue = 10;
simpleMath.multiplyValue = 20;
console.log(simpleMath.calculate());
 */

class SimpleMath<T extends number, U extends number | string> {
	baseValue: T;
	multiplyValue: U;
	calculate(): number {
		return +this.baseValue * +this.multiplyValue;
	}
}

const simpleMath = new SimpleMath<number, string>();
simpleMath.baseValue = 10;
simpleMath.multiplyValue = "20";
console.log(simpleMath.calculate());
