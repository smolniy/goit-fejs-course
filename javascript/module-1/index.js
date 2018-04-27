
'use strict'
let SHARM = 15;
let HURGADA = 25;
let TABA = 6;

let needPlaces = prompt('введите нужное кол-во мест:');
const input = Number(needPlaces);
const isItValid = needPlaces !==null && !Number.isNaN(input);

if(isItValid && TABA >=input || SHARM>=input || HURGADA>=input){
    
    if(input >=1 && input <=6){
    let isGoing = confirm(`согласны ли вы быть в группе TABA?`);
    if(isGoing === true){
    alert('Приятного путешествия в группе TABA!');
    TABA = TABA - input;
    }
        
    else{
        alert("Нам очень жаль, приходите еще!");
    }
    }
    
  
    else if(input >=7 && input <=15){
    let isGoing = confirm('согласны ли вы быть в группе SHARM ?');
    if (isGoing === true){
        alert('Приятного путешествия в группе SHARM!');
        SHARM = SHARM - input;
    }
    else{
        alert("Нам очень жаль, приходите еще!");
    }
    }    
    
    else if(input >=16 && input <=25) {
    let isGoing = confirm('согласны ли вы быть в группе HURGADA?');
    if(isGoing === true){
        alert('Приятного путешествия в группе HURGADA!');
        HURGADA = HURGADA - input;
    }
    
    else{
        alert("Нам очень жаль, приходите еще!");
    }
    }
}
else if(TABA<=input || SHARM<=input || HURGADA<input){
  alert('Извините, мест нет.');
}

else{
    alert('ошибка ввода!');
}


    
