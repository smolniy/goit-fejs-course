'use strict';
export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
    this.finder = document.querySelector('.url-finder');
    this.addButton = document.querySelector('.addButton');
    this.linkTest = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    this.addButton.addEventListener('click', event => {
      event.preventDefault();
      const inputValue = event.target.parentNode.querySelector('.input').value;
      if (!inputValue) return;
      if (!this.linkTest.test(inputValue)) {
        alert('you link is not valid');
        this.finder.reset();
        return;
      }
      if (this.model.itemExist(inputValue)) {
        alert('the link already exist');
        this.finder.reset();
        return;
      }
      const newItem = this.view.handleAdd(this.model.saveItem(inputValue));
      const removeBtn = newItem.querySelector('.remove-btn');
      removeBtn.addEventListener('click', this.onRemove.bind(this));
      this.finder.reset();
    });
    this.onInit();
  }
  onRemove(event) {
    const itemId = event.target.parentNode.dataset.id;
    this.model.removeItem(itemId);
    this.view.handleRemove(itemId);
  }
  onInit() {
    this.view.addBunch(this.model.existingItems()).forEach(elem => {
      const removeBtn = elem.querySelector('.remove-btn');
      removeBtn.addEventListener('click', this.onRemove.bind(this));
    });
  }
}