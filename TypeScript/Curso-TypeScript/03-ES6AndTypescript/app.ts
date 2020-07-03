console.log("It Works...");

let variable = "Test";
console.log(variable);
variable = "Another value";
console.log(variable);


const maxLevels = 100;
console.log(maxLevels);
// maxLevels = 40; Won't work


function reset() {
	//console.log(variable); Won't work
	let variable = null;
	console.log(variable);
}
reset();
console.log(variable);


const countDown = (start: number = 10, end: number = start - 5 ): void => {
	console.log("Init:", start);
	while (start > 0){
		start--;
	}
	console.log("End: ", start, " end: ", end );
};

countDown();

const userData = {userName: "Spawn", userAge: 39, userLogin: "Spawn"};
const {userName, userLogin} = userData;
console.log(userName,userLogin);
