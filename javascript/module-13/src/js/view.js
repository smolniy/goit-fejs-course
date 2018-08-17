import EventEmitter from '../services/event-emitter';
import * as storage from '../services/storage';

export default class View extends EventEmitter {
    constructor () {
        super();

        this.form = document.querySelector('.form');
        this.input = this.form.querySelector('.form-input');
        this.bookmarks = document.querySelector('.bookmarks');

        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    handleAdd(event) {
        event.preventDefault();
        const valueInput = this.input.value;
        if(valueInput === '') return;
        this.emit('add', valueInput);
    };

    createBookmark(link) {
        const item = document.createElement('div');
        item.dataset.id = link.id;
        item.classList.add('item');

        const title = document.createElement('a');
        title.textContent = link.title;
        title.classList.add('title');
        title.setAttribute('href', this.input.value);
        title.setAttribute('target', '_blank');

        const button = document.createElement('button');
        button.textContent = 'remove';
        button.dataset.action = 'remove';
        button.classList.add('btnDel');

        item.append(title, button);
        this.appendEventListners(item);
        return item;
    };

    addBookmark(link) {
        const item = this.createBookmark(link);
        this.form.reset();
        this.bookmarks.appendChild(item);
    };

    appendEventListners(item) {
        const removeBtn = item.querySelector('[data-action="remove"]');

        removeBtn.addEventListener('click', this.handleRemove.bind(this));
    };

    handleRemove({target}) {
        const parent = target.closest('.item');
        
        this.emit('remove', parent.dataset.id);
    };

    removeBookmark(id) {
        const item = this.bookmarks.querySelector(`[data-id="${id}"]`);
        this.bookmarks.removeChild(item);
    };
}