'use strict';
import template from '../templates/itemTempl.hbs';

export default class View {
  constructor() {
    this.gridItems = document.querySelector('.grid');
  }

  addBunch(items) {
    if (items.length === 0) return [];
    const createdItems = items.reduce((acc, item) => {
      acc.unshift(this.handleAdd(item));
      return acc;
    }, []);
    this.gridItems.append(...createdItems);
    return createdItems;
  }

  handleAdd(item) {
    if (!item.linkContent) return;
    const linkWrapper = this.createItem(item);
    this.gridItems.prepend(linkWrapper);
    return linkWrapper;
  }

  createItem(item) {
    const linkWrapper = document.createElement('div');
    linkWrapper.dataset.id = item.id;
    linkWrapper.classList.add('link-wrapper');
    const box = document.createElement('a');
    box.setAttribute('href', item.linkContent);
    box.classList.add('link-content');
    box.textContent = item.linkContent;
    linkWrapper.appendChild(box);
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    linkWrapper.appendChild(removeBtn);
    return linkWrapper;
  }

  handleRemove(id) {
    if (!id) return;
    const itemToRemove = this.gridItems.querySelector(`[data-id="${id}"]`);
    this.gridItems.removeChild(itemToRemove);
  }
}