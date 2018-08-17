import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import './css/styles.css';

const view = new View();
const model = new Model();
new Controller(model, view);

