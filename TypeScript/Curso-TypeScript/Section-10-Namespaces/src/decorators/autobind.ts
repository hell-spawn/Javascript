// autobind Decorator

namespace App {

    export function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
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

}
