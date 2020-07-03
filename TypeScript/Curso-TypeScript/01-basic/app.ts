/*
let bankAccount = {
	money: 2000,
	deposit(value){
		this.money += value;
	}
};

let myself = {
	name: "Max",
	bankAccount: bankAccount,
	hobbies:["Sports", "Cooking"]
};

myself.bankAccount.deposit(3000);

console.log(myself);
 */

type BankAccount = {money: number, deposit:(value: number) => void} 

let bankAccount: BankAccount = {
	money: 2000,
	deposit(value: number): void {
		this.money += value;
	}
};

let myself:{name: string, bankAccount: BankAccount, hobbies: [string, string]} = {
	name: "Max",
	bankAccount: bankAccount,
	hobbies:["Sports", "Cooking"]
};

