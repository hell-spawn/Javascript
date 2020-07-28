export  abstract class ProjectComponent<T extends HTMLElement, U extends HTMLElement> {

    templateElement: HTMLTemplateElement;
    parentElement: T;
    newElement: U;

    constructor(templateId: string, appId: string,  insertAtBeginning: boolean, mainId? :string ){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.parentElement = document.getElementById(appId)! as T;
        const mainNode = document.importNode(this.templateElement!.content, true);
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

