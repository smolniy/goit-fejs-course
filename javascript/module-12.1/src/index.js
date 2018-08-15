import './styles.css';
import {
    fetchImage
} from './services/api';
import './test.scss';
import * as storage from './services/storage'
import articleTlp from './templates/article.hbs';



const form = document.querySelector('.form')
const input = document.querySelector('.input')
const grid = document.querySelector('.grid')
const spinner = document.querySelector('.spinner-overlay');
const persistedPhotos = storage.get()
const fetchedPhotos = persistedPhotos ? persistedPhotos : [];

const murkup = fetchPhotos(fetchedPhotos);
updateGrid(murkup)


function createImg (photos) {
    grid.innerHTML = '';
    photos.forEach(cont => {
        let content = articleTlp(cont);
        return grid.innerHTML += content;
    })
}

const submitForm = event => {
    event.preventDefault()
    spinnerToggle()

    fetchImage(input.value, 18).then(photos => {
        console.log(photos)
        fetchedPhotos.push(...photos);
        storage.set(fetchedPhotos)
        createImg(photos);
        spinnerToggle();
    })
    event.target.reset();

}

form.addEventListener('submit', submitForm)


//================  helpers


function fetchPhotos(data) {
    return data.reduce((markup, photos) => markup + articleTlp(photos), '')
}

function updateGrid(markup) {
    grid.innerHTML += markup;
}

function spinnerToggle () {
    spinner.classList.toggle('visible')
}