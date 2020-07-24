// Code goes here!

//Drag and Drop

interface Draggable {

    dragStartHandler(event: DragEvent): void;

    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {

    dragOverHandler(event: DragEvent): void;

    dropHandler(event: DragEvent): void;

    dragLeaveHandler(event: DragEvent): void;

}


enum ProjectStatus {
    ACTIVE,
    FINISHED
}


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

// autobind Decorator
function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
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

//Object Project
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus ) {

    }
}

type Listener<T> = (items :T[]) => void;

class State<T> {

    protected listeners: Listener<T>[] = [];

    addListeners(listenerFuntion: Listener<T>){
        this.listeners.push(listenerFuntion);
    }

}

class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor(){
        super();
    }


    static getInstance(): ProjectState {
        if(ProjectState.instance){
            return ProjectState.instance;
        }
        ProjectState.instance = new ProjectState();
        return ProjectState.instance;
    }


    addProject( title: string, description: string, people: number){
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);       
        this.projects.push(newProject);
        for (const listenerFuntion of this.listeners) {
            listenerFuntion(this.projects.slice()); 
        }
    }


    changeProjectStatus(projectId: string, newStatus: ProjectStatus){
        let project = this.projects.find(project => {
            return project.id === projectId;
        });
        if(project && project.status !== newStatus){
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners(){
        for (const listenerFun of this.listeners) {
           listenerFun(this.projects.slice()); 
        }
    }

}

abstract class ProjectComponent<T extends HTMLElement, U extends HTMLElement> {

    templateElement: HTMLTemplateElement;
    parentElement: T;
    newElement: U;

    constructor(templateId: string, appId: string,  insertAtBeginning: boolean, mainId? :string ){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.parentElement = document.getElementById(appId)! as T;
        const mainNode = document.importNode(this.templateElement.content, true);
        this.newElement = mainNode.firstElementChild as U;
        if(mainId){
            this.newElement.id = mainId;
        }
        this.attach(insertAtBeginning);
    }

    private attach(insertAtBeginning: boolean){
        if(insertAtBeginning){
            this.parentElement.insertAdjacentElement('afterbegin', this.newElement);
        } else {
            this.parentElement.insertAdjacentElement('beforeend', this.newElement);
        }    
    }
}

class ProjectList  extends ProjectComponent<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderElement();
    }
   
    private configure(){
        this.newElement.addEventListener('dragover', this.dragOverHandler);
        this.newElement.addEventListener('dragleave', this.dragLeaveHandler);
        this.newElement.addEventListener('drop', this.dropHandler);
        projectState.addListeners((projects: Project[]) => {
            let categoryProjects = projects.filter((project) => {
                if(this.type === 'active'){
                    return project.status === ProjectStatus.ACTIVE; 
                } else {
                    return project.status === ProjectStatus.FINISHED; 
                }
            });
            this.assignedProjects = categoryProjects;
            this.renderProjects();
        });
    } 

    private renderProjects(){
        const containerList = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        containerList.innerHTML = '';
        for(const project of this.assignedProjects){
            new ProjectItem(this.newElement.querySelector('ul')!.id, project)
        }
    }

    private renderElement(){
        const listId = `${this.type}-project-list`; 
        this.newElement.querySelector('ul')!.id = listId;
        this.newElement.querySelector('h2')!.textContent = this.type.toUpperCase();
    }

    @autobind
    dragOverHandler(event: DragEvent){
        event.preventDefault();
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
            const listElement = this.newElement.querySelector('ul')!;
            listElement.classList.add('droppable');
        }
    }

    @autobind
    dragLeaveHandler(_event: DragEvent){
        const listElement = this.newElement.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

   
    @autobind 
    dropHandler(event: DragEvent){
        event.preventDefault();
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.changeProjectStatus(projectId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    }
}

/*Main project*/
class ProjectInput extends ProjectComponent <HTMLDivElement, HTMLFormElement>{

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

class ProjectItem extends ProjectComponent<HTMLElement,HTMLElement> implements Draggable {

    project: Project;

    constructor(parentId: string, project: Project) {
        super('single-project', parentId, false, project.id); 
        this.project = project;
        this.renderContent();
        this.parentElement.addEventListener('dragstart', this.dragStartHandler);
        this.parentElement.addEventListener('dragend', this.dragEndHandler);
    }

    get persons(){
        if(this.project.people === 1){
            return `${this.project.people} person assigned`
        }
        return `${this.project.people} persons assigned`

    }

    renderContent() {
        this.newElement.querySelector('h2')!.textContent = this.project.title;
        this.newElement.querySelector('h3')!.textContent = this.persons;
        this.newElement.querySelector('p')!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent){
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_event: DragEvent){
    }


}

const projectState = ProjectState.getInstance();
const appProject = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

