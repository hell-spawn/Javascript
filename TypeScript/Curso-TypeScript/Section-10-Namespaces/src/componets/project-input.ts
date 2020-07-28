///<reference path="base-component.ts" />
///<reference path="../decorators/autobind.ts" />

namespace App {

    export class ProjectInput extends ProjectComponent <HTMLDivElement, HTMLFormElement>{

        titleElement: HTMLInputElement;
        descriptionElement: HTMLInputElement;
        peopleElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleElement = this.newElement.querySelector('#title') as HTMLInputElement;
            this.descriptionElement = this.newElement.querySelector('#description') as HTMLInputElement;
            this.peopleElement = this.newElement.querySelector('#people') as HTMLInputElement;
            this.configure();
        }

        private configure(){
            this.newElement.addEventListener('submit', this.submitHandler);
        }


        private clearInputs() {
            this.titleElement.value = '';
            this.descriptionElement.value = '';
            this.peopleElement.value = '';
        }

        @autobind
        private submitHandler(event: Event){
            event.preventDefault();
            const dataInput =  this.builtUserInput();
            if(Array.isArray(dataInput)){
                const [title, desc, people] = dataInput;
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }


        private builtUserInput(): [string, string, number] | void {
            const title = this.titleElement.value;	
            const description = this.descriptionElement.value;	
            const people = this.peopleElement.value;	

            const validatorTitle: Validatable = {
                value: title,
                required: true,
                minLength: 5,
                maxLength: 10
            }

            const validatorDescription: Validatable = {
                value: description,
                required: true,
                minLength: 5,
                maxLength: 30
            }

            const validatorPeople: Validatable = {
                value: +people,
                required: true,
                min: 1, 
                max: 5
            }

            if( !validate( validatorTitle ) || !validate( validatorDescription ) || !validate( validatorPeople )){
                alert('Invalid Input please try again!');
                return;
            }else{
                return [title, description, +people];
            }
        }

    }

}
