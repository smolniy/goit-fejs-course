'use strict'

const time = document.querySelector('.js-time');
const start = document.querySelector('.js-start');
const lap = document.querySelector('.js-take-lap');
const reset = document.querySelector('.js-reset');
let laps = document.querySelector('.js-laps');
let stroke = document.querySelectorAll('li');
let timerId = null;
let isActive = false;

let lapArr = Array.from(laps);
let lightArr; 

let startTime = null;
let stopTime = 0;
let timeNow = null;
let currentTime;

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
    startTime = Date.now() + stopTime;
    start.textContent = 'Pause';
    reset.disabled = false;
    lap.disabled = false;
    timerId = setInterval(updateValue, 100);
} else {
    handlePause();
  }
}

function updateValue(){
  currentTime = Date.now();
  timeNow = new Date(currentTime - startTime);
  minutes = timeNow.getMinutes();
  seconds = timeNow.getSeconds();
  milliseconds = Number.parseInt(timeNow.getMilliseconds() / 100 );
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  if (milliseconds === '') milliseconds = 0;
  time.textContent = `${minutes}:${seconds}.${milliseconds}`;
  
}

function handlePause() {
  isActive = false;
  stopTime = startTime - Date.now();
  clearInterval(timerId);
  start.textContent = 'continue';
  lap.addEventListener('click', handleLap);
  
}
function handleLap(){
  const newLap = document.createElement('li');
  newLap.textContent = `${minutes}:${seconds}.${milliseconds}`;
  laps.appendChild(newLap);
  lapArr.push(newLap.textContent);
  lightArr = lapArr;
  
  console.log(lapArr);
}
 
function handleReset() {
  isActive = false;
  clearInterval(timerId);
  time.textContent = '00:00.0';
  start.textContent = 'Start';
  reset.disabled = true;
  lap.disabled = true;
  stopTime = 0;
  startTime = null;
  laps.remove(stroke);
  lapArr = [];
  location.reload(true)
}   
