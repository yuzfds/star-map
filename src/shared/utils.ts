import { v4 as uuidv4 } from 'uuid';


export function generateUUID(){
    return uuidv4();
}

export function isArray(arr:any){
    return Array.isArray(arr);
}

export function isFunction(func:any){
    return typeof func === 'function';
}
