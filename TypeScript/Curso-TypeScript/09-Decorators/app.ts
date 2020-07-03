// Decorators
function logged(target: Function) {
    console.log('Constructor: ' + target);
}

@logged
class Person {
    constructor(){
        console.log('It works ...');
    }
}

function logging(value: boolean){
    return value ? logged : null;
}

@logging(false)
class Car {

}

//Advanced
function printable(target: Function) {
    target.prototype.print = function () {
        console.log(this);
    }
}

@printable
class Plant {
    name: string = 'Green plant';
}

const myPlant = new Plant();
(<any>myPlant).print();

class Project {

    @overwritable(true)
    projectName: String;

    constructor(projectName: String){
        this.projectName = projectName;
    }

    @editalble(true)
    calcbudget(){
        console.log('Budget: ' + 1000 );
    }

}

// Bloqueo sobre escritura metodo
function editalble(value: boolean) {
    return function (target: any, proName: string, descriptor: PropertyDescriptor){
        console.log('Target: ' + target);
        console.log('Property' + proName);
        descriptor.writable = value;
    }
}
// Bloqueo edicion property ... ?
function overwritable(value: boolean) {
    return function (target: any, propertyName: string) : any {
        console.log('Target: ' + target);
        console.log('Property' + propertyName);

        const myPropertyDescriptor: PropertyDescriptor = {
            writable:value
        }
        return myPropertyDescriptor;
    }
}

const myProject = new Project("MyProject");
myProject.calcbudget();
myProject.calcbudget = function () {
    console.log('Budget: ' + 2000);
}
myProject.calcbudget();

// Decarator para un parametro
function printInfo(target: any, methodName: string, paramIndex: number) {
   console.log('Target: ' + target);
   console.log('Method: ' +  methodName);
   console.log('paramIndex: ' + paramIndex);

}

class Course {

    private name: string;
    constructor(name: string){
        this.name = name;
    }

    printAll(mode: string, @printInfo printAll: boolean){
        if(printAll){
            console.log(1000);
        }else{
            console.log(1);
        }
    }

}

const myCourse = new Course('TypeScript');
myCourse.printAll('All', true);
