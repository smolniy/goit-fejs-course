import template from './templates/bookmark.hbs';
import *as storage from './services/storage.js';
import './styles.css';

const listUrl = document.querySelector('.js-url-list');
const input = document.querySelector('input');
const button = document.querySelector('.button');
const persisted = storage.get();
const links = { savedLink: [] };

if (persisted) {
    links.savedLink = persisted;
    rendering();
}

button.addEventListener('click', handleSubmit);

function addLink() {
  links.savedLink.push(input.value);
  storage.set(links.savedLink);
}

function handleSubmit(event) {
  event.preventDefault();
  addLink();
  rendering();
  form.reset();
};

function handleDelete(event) {
    event.preventDefault();
    let listItem = event.target.parentElement;;
    let updateStorage = storage.get().filter((elem) => {
        return elem != document.querySelector('.link').innerHTML.trim();
    });
    storage.set(updateStorage);
    listItem.remove();
};

document.querySelectorAll('.delBtn').forEach((elem) => {
    elem.addEventListener('click', handleDelete);
});

function rendering() {
  const markup = links.savedLink.reduce((acc, item) =>
    acc + template({ link: item,}), '');
    listUrl.innerHTML = markup;
};