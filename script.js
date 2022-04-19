//EXTRA CREDIT: Add a . button and let users input decimals!(disable the decimal button if there’s already one in the display)
// EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.
// EXTRA CREDIT: Add keyboard support!


const operators = Array.from(document.querySelectorAll('.operator'));
const clearButton = document.querySelector('.clear');
// //const addButton = document.querySelector(".add-button");
// //const subtractButton = document.querySelector(".subtract-button");
// const multiplyButton = document.querySelector(".multiply-button");
// const divideButton = document.querySelector(".divide-button");
const operateButton = document.querySelector(".operate");
const numberButtons = Array.from(document.querySelectorAll('.number'));
const display = document.querySelector('.display')
const history = document.querySelector('.history')

let currentNumber1 = null
let currentNumber2 = null
let currentOperator = '';
let shouldResetScreen = false;

function clear(){
    history.textContent='';
    display.textContent='';
    currentOperator = '';
    shouldResetScreen = false;
}

function resetScreen(){
    display.textContent = ''
    shouldResetScreen = false
}

function setCurrentOperator(sign){
    if(currentOperator !== '')operate();
    currentOperator = sign;
    currentNumber1 = parseInt(display.textContent);
    history.textContent = `${currentNumber1} ${sign}`
    shouldResetScreen = true;
}

function operate(){
    if(currentOperator==null || shouldResetScreen)return
    currentNumber2 = parseInt(display.textContent)
    let result = null
    switch(currentOperator){
        case "+" : result = add(currentNumber1,currentNumber2); break;
        case "-" : result = subtract(currentNumber1,currentNumber2); break;
        case "*" : result = multiply(currentNumber1,currentNumber2); break;
        case "/" : result = divide(currentNumber1,currentNumber2); break;
        default : if(num2==null){break}
    }
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
    if(num2 == 0){
        alert("You cannot divide by zero!")
    }
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
clearButton.addEventListener("click", () => clear());
// addButton.addEventListener("click", () => setCurrentOperator("+"));
// subtractButton.addEventListener("click", () => setCurrentOperator("-"));
// multiplyButton.addEventListener("click", () => setCurrentOperator("*"));
// divideButton.addEventListener("click", () => setCurrentOperator("/"));
operateButton.addEventListener("click", () => operate(currentNumber1,currentNumber2));

// Add animations to buttons

        // function removeTransition(e){
        //     if(e.propertyName != 'transform') return
    
        //     this.classList.remove('playing');
        // }
    
        // const keys = document.querySelectorAll(".key")
        // keys.forEach(key => {
        //     key.addEventListener('transitionend', removeTransition)
        // });