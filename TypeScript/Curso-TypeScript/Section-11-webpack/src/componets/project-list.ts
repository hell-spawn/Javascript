import { ProjectComponent } from './base-component'
import { Project } from '../models/project'
import { autobind } from '../decorators/autobind'
import { DragTarget } from '../models/drag-drop-interfaces'
import { ProjectItem } from '../componets/project-item'
import { ProjectStatus } from '../models/project-status'
import { projectState } from '../models/project-state'

export class ProjectList  extends ProjectComponent<HTMLDivElement, HTMLElement> implements DragTarget {

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
