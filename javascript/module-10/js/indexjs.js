'use strict'

const time = document.querySelector('.js-time');
    const start = document.querySelector('.js-start');
    const lap = document.querySelector('.js-take-lap');
    const reset = document.querySelector('.js-reset');
    let timerId = null;
    let isActive = false;

    let startTime = null;
    let pauseTime = 0;
    let timeNow = null;

    let minutes;
    let seconds;
    let milliseconds;
    let currentTime;

    reset.disabled = true;
    lap.disabled = true;

    const play = () => {
        isActive ? handlePause() : handleStart();
    }

    function handleStart() {
        isActive = true;
        startTime = Date.now() + pauseTime;
        start.textContent = 'Pause';
        reset.disabled = false;
        lap.disabled = false;
        timerId = setInterval(updateValue, 100);
    }

    function handlePause() {
        isActive = false;
        pauseTime = startTime - Date.now();
        clearInterval(timerId);
        start.textContent = 'continue';
    }

    function updateValue() {
        currentTime = Date.now();
        timeNow = new Date(currentTime - startTime);
        minutes = timeNow.getMinutes();
        seconds = timeNow.getSeconds();
        milliseconds = Number.parseInt(timeNow.getMilliseconds() / 100);
        time.textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    start.addEventListener('click', play);