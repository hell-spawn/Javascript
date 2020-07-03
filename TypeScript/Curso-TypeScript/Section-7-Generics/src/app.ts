console.log('Generics');
// Array is Generic

const names: Array<string> = ['Spawn', 'StarLord'];
names[0].split('');


// Promise
const miPromise: Promise<string> = new Promise<string>(((resolve, reject) => {
    setTimeout(() =>{
       resolve('This is promise');
    }, 2000 );
}));



miPromise.then(data => {
   data.split(' ');
});


/*
Mezclar Objetos
function  mergeObject(objA: object, objB: object){
    return Object.assign(objA,objB);
}

const mergedObj = mergeObject({name: "Spawn"}, {age: 30});

 */
// mergedObj.name /*TS no puede resolver los atributos*/

/*Generic basic*/
/*
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA,objB);
}

const mergedObj = merge({name: "Spawn"}, {age: 30});

 */
/*Generic restiction */
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA,objB);
}

const mergedObj = merge({name: "Spawn", hobbies: ['Sports']}, {age: 30});
console.log(mergedObj.name);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy >(element : T): [T, string] {
    if(element.length === 1){
        return [element, 'Got no value'];
    } else {
      return [element, 'Got ' + element.length + ' elements.'];
    }
}

console.log(countAndDescribe('Hello'));


/*Generic keyof T*/

function extract<T extends object, U extends keyof T> (obj: T, key: U) {
    return obj[key];
}
extract({name:'name'}, 'name' );


class DataStorage<T> {

    private data: T[] = [];

    addItem(item : T){
        this.data.push(item);
    }

    removeItem(item : T){
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems(){
        return [...this.data];
    }
}


const textStorage = new DataStorage<string>();

textStorage.addItem("Iron Man");
textStorage.addItem("Thor");
textStorage.addItem("Spider Man");

textStorage.removeItem("Thor");

console.log(textStorage.getItems());


const objectStore = new DataStorage<object>();
objectStore.addItem({name: 'Iron Man'});
objectStore.addItem({name: 'Thor'});
objectStore.addItem({name: 'Spider Man'});

// No funciona no es el mismo objecto, js elimina el ultimo valor del array
objectStore.removeItem({name: 'Thor'});

// Puede funcionar si pasamos el mismo objeto.
const heroe = {name: 'Hawkeje'}
objectStore.addItem(heroe);
objectStore.addItem({name: 'Hulk'});

console.log(objectStore.getItems());

objectStore.removeItem(heroe);

console.log(objectStore.getItems());

