///<reference path="base-component.ts" />

namespace App {

   export class ProjectItem extends ProjectComponent<HTMLElement,HTMLElement> implements Draggable {

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

}
