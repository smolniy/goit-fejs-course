'use strict'

const time = document.querySelector('.js-time');
const start = document.querySelector('.js-start');
const lap = document.querySelector('.js-take-lap');
const reset = document.querySelector('.js-reset');
let laps = document.querySelector('.js-laps');
let stroke = document.querySelectorAll('li');
let timerId = null;
let newTimerId = null;
let isActive = false;

let startTime = Date.now();
let deltaTime = 0;
let stopTime = 0;
let timeNow = null;

let minutes;
let seconds;
let milliseconds;

reset.disabled = true;
lap.disabled = true;
start.addEventListener('click', handleStart);
lap.addEventListener('click', handleLap);
reset.addEventListener('click', handleReset);

function handleStart(){
  if(!isActive){
    isActive = true;
    start.textContent = 'Pause';
    reset.disabled = false;
    lap.disabled = false;
    timerId = setInterval(updateValue, 100);
    
  }
  else {
    handlePause();
  }
}

function updateValue(){
  let currentTime = Date.now();
  deltaTime = currentTime - startTime;
  timeNow = new Date(deltaTime);
  minutes = timeNow.getMinutes();
  seconds = timeNow.getSeconds();
  milliseconds = Number.parseInt(timeNow.getMilliseconds() / 100 );
  time.textContent = `${minutes}:${seconds}.${milliseconds}`;
  
}

function handlePause() {
  clearInterval(timerId);
  start.textContent = 'continue';
  isActive = false;
  stopTime = Date.now();
  newTimerId = setInterval(updateValueAfterPause, 100);
  
}  
function updateValueAfterPause() {
  clearInterval(newTimerId);
  //stopTime = Date.now();
  deltaTime= stopTime - startTime;
  timeNow = new Date(deltaTime); 
  minutes = timeNow.getMinutes();
  seconds = timeNow.getSeconds();
  milliseconds = Number.parseInt(timeNow.getMilliseconds() / 100 );
  time.textContent = `${minutes}:${seconds}.${milliseconds}`;
}