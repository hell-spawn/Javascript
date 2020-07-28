// Code goes here!

///<reference path="componets/project-input.ts" />
///<reference path="componets/project-list.ts" />

namespace App {

    /*Main project*/

    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');

}
