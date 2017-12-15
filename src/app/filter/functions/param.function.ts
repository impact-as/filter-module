import { Params } from '@angular/router/src/shared';
import { IKeyValueObj, IKeyRangeObj } from '../models/object.model';

export const assignToValueProperty = (params: Params, obj: IKeyValueObj): Params => {   
    let newKeyValue = {};    

    if (obj.isActive) {
        newKeyValue[obj.key] = obj.value;
    }        

    return Object.assign(params, newKeyValue);        
}

export const assignToRangeProperty = (params: Params, obj: IKeyRangeObj): Params => {
    let newKeyValue = {};    

    if (obj.isActive) {
        newKeyValue[obj.key] = `${obj.from}|${obj.to}`;
    }        

    return Object.assign(params, newKeyValue);        
}

export const assignToArrayProperty = (params: Params, obj: IKeyValueObj): Params => {
    if (!obj.isActive) {
        return params;
    }

    let newKeyValue = {};    

    newKeyValue[obj.key] = [obj.value];

    if (params[obj.key] instanceof Array) {
        newKeyValue[obj.key].push(...params[obj.key]);
    }

    return Object.assign(params, newKeyValue);
}