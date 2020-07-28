import { Project } from '../models/project.js'
import { ProjectStatus } from '../models/project-status.js'

type Listener<T> = (items :T[]) => void;

class State<T> {

    protected listeners: Listener<T>[] = [];

    addListeners(listenerFuntion: Listener<T>){
        this.listeners.push(listenerFuntion);
    }

}

export class ProjectState extends State<Project> {

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

export const projectState = ProjectState.getInstance();

