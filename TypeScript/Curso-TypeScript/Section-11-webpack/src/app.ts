/*Main project*/
import { ProjectInput } from './componets/project-input';
import { ProjectList } from './componets/project-list';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');


console.log('It works..');
