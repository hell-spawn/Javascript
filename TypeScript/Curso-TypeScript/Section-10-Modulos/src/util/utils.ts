export interface Validatable {
    required: boolean;
    value: string | number;
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
}

export function validate(validation: Validatable): boolean {
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
