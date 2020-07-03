namespace MyMath {

	const PI = 3.14;

	export function calculateCircunference(diameter: number) {
		return diameter * PI;
	}

	export function calculateRectangle(width: number, height: number) {
		return width * height;
	}
}


console.log(MyMath.calculateRectangle(10, 20));
console.log(MyMath.calculateCircunference(20));
