'use strict'

const time = document.querySelector('.js-time');
const start = document.querySelector('.js-start');
const lap = document.querySelector('.js-take-lap');
const reset = document.querySelector('.js-reset');
let laps = document.querySelector('.js-laps');
let stroke = document.querySelectorAll('li');
let timerId = null;
let isActive = false;

let startTime = Date.now();
let deltaTime = 0;

let minutes;
let seconds;
let milliseconds;

reset.disabled = true;
lap.disabled = true;
start.addEventListener('click', handleStart);
lap.addEventListener('click', handleLap);

function handleStart(){
  if(!isActive){
    isActive = true;
    start.textContent = 'Pause';
    reset.disabled = false;
    lap.disabled = false;
    timerId = setInterval(updateValue, 100);
    start.addEventListener('click', handlePause);
    reset.addEventListener('click', handleReset);
  }
}

function updateValue(){
  const currentTime = Date.now();
  deltaTime = currentTime - startTime;
  const timeNow = new Date(deltaTime);
  minutes = timeNow.getMinutes();
  seconds = timeNow.getSeconds();
  milliseconds = Number.parseInt(timeNow.getMilliseconds() / 100 );
  time.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function handlePause() {
  clearInterval(timerId);
  start.textContent = 'continue';
  isActive = true;
  const stopTime = Date.now();
  start.addEventListener('click', goingAfterPause);
  
  
  function goingAfterPause() {
    clearInterval(timerId);
    timerId = setInterval(valueAfterPause, 100);
    start.textContent = 'Pause';
    
    lap.addEventListener('click', handleLap);
    start.addEventListener('click', handlePause);
    
  }
  function valueAfterPause(){
    const currentTime = Date.now(stopTime);
    deltaTime = currentTime - startTime ;
    
    const timeNow = new Date(deltaTime);
    minutes = timeNow.getMinutes();
    seconds = timeNow.getSeconds();
    milliseconds = Number.parseInt(timeNow.getMilliseconds() / 100 );
    
    time.textContent = `${minutes}:${seconds}.${milliseconds}`;
  }
}


function handleLap(){
 const newLap = document.createElement('li');
 newLap.textContent = `${minutes}:${seconds}.${milliseconds}`;
 laps.appendChild(newLap);
}
function handleReset() {
  isActive = false;
  clearInterval(timerId);
  time.textContent = '00:00.0';
  start.textContent = 'Start';
  reset.disabled = true;
  deltaTime = 0;
  startTime - null;
  laps.remove(stroke);
} 


