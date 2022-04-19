// EXTRA CREDIT: Add keyboard support!


const operators = Array.from(document.querySelectorAll('.operator'));
const numberButtons = Array.from(document.querySelectorAll('.number')).reverse();
const operateButton = document.querySelector(".operate");
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const floatButton = document.querySelector('.float');
const display = document.querySelector('.display');
const history = document.querySelector('.history');
 
console.log(operators)
let currentNumber1 = null
let currentNumber2 = null
let currentOperator = '';
let shouldResetScreen = false;

function round(num){
    num = Math.round(num * 10000) / 10000;
    return num
}

function resetScreen(){
    display.textContent = ''
    shouldResetScreen = false
}

function deleteChar(e){
    if(display.textContent == null)return;
    let newStr = display.textContent.slice(0,-1);
    display.textContent = newStr
}

function clear(e){
    currentNumber1 = null;
    history.textContent='';
    display.textContent='';
    currentOperator = '';
    shouldResetScreen = false;
}

function addFloat(e){
    if (shouldResetScreen) resetScreen()
    if(display.textContent == null || display.textContent.includes('.'))return
    else display.textContent += '.';
}

function setCurrentOperator(sign){
    if(display.textContent=="")return;
    if(currentOperator !== '')operate();
    currentOperator = sign;
    currentNumber1 = parseFloat(display.textContent);
    history.textContent = `${currentNumber1} ${sign}`
    shouldResetScreen = true;
}

function operate(){
    if(currentOperator==null || shouldResetScreen || currentNumber1 == null)return

    currentNumber2 = parseFloat(display.textContent);

    if(currentNumber2 == 0 && currentOperator == "/"){
        clear();
        display.textContent = "You cannot divide by zero";
        shouldResetScreen = true;
    }
    let result = null;

    switch(currentOperator){
        case "+" : result = add(currentNumber1,currentNumber2); break;
        case "-" : result = subtract(currentNumber1,currentNumber2); break;
        case "*" : result = multiply(currentNumber1,currentNumber2); break;
        case "/" : result = divide(currentNumber1,currentNumber2); break;
    }
    result  = round(result);
    display.textContent = result;
    history.textContent = `${currentNumber1} ${currentOperator} ${currentNumber2} =`
    currentOperator = null;
}

// Operations

function add(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    return num1/num2
}

// Event Listeners 

function typeNum(value){
    if(shouldResetScreen||display.textContent == '0'){
        resetScreen();
    }
    display.textContent+=value
}

numberButtons.forEach((button) => button.addEventListener('click', () => typeNum(button.textContent)))
operators.forEach((button) => button.addEventListener('click', () => setCurrentOperator(button.textContent)))
clearButton.addEventListener("click", () =>  {playSoundOnClick(27); clear()})
deleteButton.addEventListener("click",()  => {playSoundOnClick(8);deleteChar()})
floatButton.addEventListener("click",() => {playSoundOnClick(190);addFloat()});
operateButton.addEventListener("click", () => {playSoundOnClick(13);operate()});

// Adding sound manually to buttons because every button plays a different sound


numberButtons[0].addEventListener('click', ()=> playSoundOnClick(48)) //0
numberButtons[3].addEventListener('click', ()=> playSoundOnClick(49)) //1
numberButtons[2].addEventListener('click', ()=> playSoundOnClick(50)) //2
numberButtons[1].addEventListener('click', ()=> playSoundOnClick(51)) //3
numberButtons[6].addEventListener('click', ()=> playSoundOnClick(52)) //4
numberButtons[5].addEventListener('click', ()=> playSoundOnClick(53)) //5
numberButtons[4].addEventListener('click', ()=> playSoundOnClick(54)) //6
numberButtons[9].addEventListener('click', ()=> playSoundOnClick(55)) //7
numberButtons[8].addEventListener('click', ()=> playSoundOnClick(56)) //8
numberButtons[7].addEventListener('click', ()=> playSoundOnClick(57))

operators[0].addEventListener('click', ()=> playSoundOnClick(191));
operators[1].addEventListener('click', ()=> playSoundOnClick(48))
operators[2].addEventListener('click', ()=> playSoundOnClick(189));
operators[3].addEventListener('click', ()=> playSoundOnClick(187));

//Keyboard support

window.addEventListener('keydown',handleKeyboard);

function handleKeyboard(e){
        playSound(e)
        if (e.key >= 0 && e.key <= 9) typeNum(e.key)
        if(e.key == ".") addFloat();
        if(e.key === "=" || e.key === "Enter") operate();
        if(e.key === "Backspace") deleteChar();
        if(e.key === "Escape") clear()
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setCurrentOperator(e.key)
}

// Add sound effects

function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const button = document.querySelector(`button[data-key="${e.keyCode}"]`)
    if(!audio) return;
    audio.currentTime = 0
    audio.play();
    button.classList.add('playing');
}

function playSoundOnClick(e){
    const audio = document.querySelector(`audio[data-key="${e}"]`)
    const button = document.querySelector(`button[data-key="${e}"]`)
    if(!audio) return;
    audio.currentTime = 0
    audio.play();
    button.classList.add('playing');
}
// Add animations to buttons

function removeTransition(e){
    if(e.propertyName != 'transform') return
    this.classList.remove('playing');
    }
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
    button.addEventListener('transitionend', removeTransition)
});


