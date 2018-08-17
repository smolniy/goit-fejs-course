import {set, get} from '../services/storage';
export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('add', this.addBookmark.bind(this));
        view.on('remove', this.removeBookmark.bind(this));

        const readed = get();
        this.render(readed);
    }
    
    render(array) {
        array.forEach(elem => {this.addBookmark(elem.title)});
    }

    addBookmark(title) {
        const item = this.model.addItem(title);
        this.view.addBookmark(item);
    }
    
    removeBookmark(id) {
        this.model.removeItem(id);
        this.view.removeBookmark(id);
    }
}
