import v4 from 'uuid/v4';
import {set, get} from "../services/storage";
let storeArr = []

export default class Model {
    constructor(items = []) {
        this.items = items;
    }
    addItem (title) {
        const item = {
            id: v4(),
            title,
        }

        this.items.push(item);
        storeArr.push(item);
        set(storeArr);
        return item; 
    }

    removeItem (id) {
        this.items = this.items.filter(item => item.id !== id);
        storeArr = storeArr.filter(item => item.id !== id);
        set(storeArr)
    }    
}
