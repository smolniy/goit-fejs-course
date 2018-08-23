'use strict';
import uuid from 'uuid';

export default class Model {
  constructor() {
    if (!localStorage.getItem('linkAdder')) {
      const storage = {
        items: [],
      };
      localStorage.setItem('linkAdder', JSON.stringify(storage));
    }
  }

  existingItems() {
    return JSON.parse(localStorage.getItem('linkAdder')).items;
  }
  
  itemExist(linkContent) {
    return (
      JSON.parse(localStorage.getItem('linkAdder')).items.filter(
        item => item.linkContent === linkContent).length !== 0);
  }

  saveItem(linkContent) {
    const itemToAdd = {
      linkContent: linkContent,
      id: uuid.v4(),
    };
    const linkAdder = JSON.parse(localStorage.getItem('linkAdder'));
    linkAdder.items.push(itemToAdd);
    localStorage.setItem('linkAdder', JSON.stringify(linkAdder));
    return itemToAdd;
  }
  
  removeItem(id) {
    const linkAdder = JSON.parse(localStorage.getItem('linkAdder'));
    const items = linkAdder.items;
    linkAdder.items = items.filter(item => item.id !== id);
    localStorage.setItem('linkAdder', JSON.stringify(linkAdder));
  }
}