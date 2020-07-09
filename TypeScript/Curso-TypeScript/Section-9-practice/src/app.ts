// Code goes here!

enum ProjectStatus {
    ACTIVE,
    FINISHED
}

//Object Project
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus ) {

    }
}

type Listener = (projects: Project[]) => void;

class ProjectState {

    private projects: Project[] = [];
    private static instance: ProjectState;
    private arrayListeners : Listener[] = [];

    private constructor(){

    }


    static getInstance(): ProjectState {
        if(ProjectState.instance){
            return ProjectState.instance;
        }
        ProjectState.instance = new ProjectState();
        return ProjectState.instance;
    }

    addListeners(listenerFuntion: Listener){
        this.arrayListeners.push(listenerFuntion);
    }

    addProject( title: string, description: string, people: number){
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);       
        this.projects.push(newProject);
        for (const listenerFuntion of this.arrayListeners) {
            listenerFuntion(this.projects.slice()); 
        }
    }

}



//Validations
interface Validatable {
    required: boolean;
    value: string | number;
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
}


function validate(validation: Validatable): boolean {
    let isValid = true;
    if( validation.required ){
        isValid = isValid && ( validation.value !== null ) &&  (validation.value.toString().trim().length > 0);
    }
    if( isValid && validation.minLength ){
        isValid = isValid && validation.value.toString().trim().length >= validation.minLength;
    }

    if( isValid && validation.maxLength){
        isValid = isValid && validation.value.toString().trim().length <= validation.maxLength;
    }
    if(isValid && validation.min){
        if( typeof validation.value === 'number' ){
            isValid = isValid && validation.value >= validation.min;
        } else {
            isValid = false;
        }
    }
    if(isValid && validation.max){
        if( typeof validation.value === 'number' ){
            isValid = isValid && validation.value <= validation.max;
        } else {
            isValid = false;
        }
    }
    return isValid; 
}

// Autobind Decorator
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originaleMethod = descriptor.value;	
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const boundFn = originaleMethod.bind(this);
            return boundFn;
        }
    };

    return adjDescriptor;
}


/*Main project*/
class ProjectInput {

    templateElement: HTMLTemplateElement;
    appElement: HTMLDivElement;
    mainElement: HTMLFormElement;
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.appElement = document.getElementById('app')! as HTMLDivElement;
        const mainNode = document.importNode(this.templateElement.content, true);
        this.mainElement = mainNode.firstElementChild as HTMLFormElement;
        this.mainElement.id = 'user-input';
        this.titleElement = this.mainElement.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = this.mainElement.querySelector('#description') as HTMLInputElement;
        this.peopleElement = this.mainElement.querySelector('#people') as HTMLInputElement;
        this.configure();
        this.attach();

    }


    private attach() {
        this.appElement.insertAdjacentElement('afterbegin', this.mainElement);
    }


    private configure(){
        this.mainElement.addEventListener('submit', this.submitHandler);
    }


    private clearInputs() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }

    @Autobind
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

class ProjectList {

    templateElement: HTMLTemplateElement;
    appElement: HTMLDivElement;
    mainElement: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.appElement = document.getElementById('app')! as HTMLDivElement;
        const mainNode = document.importNode(this.templateElement.content, true);
        this.mainElement = mainNode.firstElementChild as HTMLElement;
        this.mainElement.id = `${type}-projects`;
        this.assignedProjects = [];
        projectState.addListeners((projects: Project[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderElement();
    }


    private attach() {
        this.appElement.insertAdjacentElement('beforeend', this.mainElement);
    }


    private renderProjects(){
        const containerList = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        for(const projectItem of this.assignedProjects){
            const elementProject = document.createElement('li'); 
            elementProject.textContent = projectItem.title;
            containerList.appendChild(elementProject); 
        }
    }

    private renderElement(){
        const listId = `${this.type}-project-list`; 
        this.mainElement.querySelector('ul')!.id = listId;
        this.mainElement.querySelector('h2')!.textContent = this.type.toUpperCase();
    }

}
const projectState = ProjectState.getInstance();
const appProject = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

