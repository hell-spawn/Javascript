"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Decorators
function logged(target) {
    console.log('Constructor: ' + target);
}
var Person = /** @class */ (function () {
    function Person() {
        console.log('It works ...');
    }
    Person = __decorate([
        logged
    ], Person);
    return Person;
}());
function logging(value) {
    return value ? logged : null;
}
var Car = /** @class */ (function () {
    function Car() {
    }
    Car = __decorate([
        logging(false)
    ], Car);
    return Car;
}());
//Advanced
function printable(target) {
    target.prototype.print = function () {
        console.log(this);
    };
}
var Plant = /** @class */ (function () {
    function Plant() {
        this.name = 'Green plant';
    }
    Plant = __decorate([
        printable
    ], Plant);
    return Plant;
}());
var myPlant = new Plant();
myPlant.print();
var Project = /** @class */ (function () {
    function Project(projectName) {
        this.projectName = projectName;
    }
    Project.prototype.calcbudget = function () {
        console.log('Budget: ' + 1000);
    };
    __decorate([
        overwritable(true)
    ], Project.prototype, "projectName", void 0);
    __decorate([
        editalble(true)
    ], Project.prototype, "calcbudget", null);
    return Project;
}());
// Bloqueo sobre escritura metodo
function editalble(value) {
    return function (target, proName, descriptor) {
        console.log('Target: ' + target);
        console.log('Property' + proName);
        descriptor.writable = value;
    };
}
// Bloqueo edicion property ... ?
function overwritable(value) {
    return function (target, propertyName) {
        console.log('Target: ' + target);
        console.log('Property' + propertyName);
        var myPropertyDescriptor = {
            writable: value
        };
        return myPropertyDescriptor;
    };
}
var myProject = new Project("MyProject");
myProject.calcbudget();
myProject.calcbudget = function () {
    console.log('Budget: ' + 2000);
};
myProject.calcbudget();
// Decarator para un parametro
function printInfo(target, methodName, paramIndex) {
    console.log('Target: ' + target);
    console.log('Method: ' + methodName);
    console.log('paramIndex: ' + paramIndex);
}
var Course = /** @class */ (function () {
    function Course(name) {
        this.name = name;
    }
    Course.prototype.printAll = function (mode, printAll) {
        if (printAll) {
            console.log(1000);
        }
        else {
            console.log(1);
        }
    };
    __decorate([
        __param(1, printInfo)
    ], Course.prototype, "printAll", null);
    return Course;
}());
var myCourse = new Course('TypeScript');
myCourse.printAll('All', true);
