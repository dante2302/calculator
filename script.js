const addButton = document.querySelector(".add-button")
const subtractButton = document.querySelector(".subtract-button")
const multiplyButton = document.querySelector(".multiply-button")
const divideButton = document.querySelector(".divide-button")
const operateButton = document.querySelector(".operate-button")
const numberButtons = Array.from(document.querySelectorAll('.number'));
const display = document.querySelector('.display')
const history = document.querySelector('.history')

let currentNumber1 = null
let currentNumber2 = null
let currentOperator = null;

function setCurrentNumber(num){
    num = parseInt(num);
    if(currentNumber1 == null){currentNumber1 = num;}
    else currentNumber2 = num;
}

function setCurrentOperator(sign){
    if(currentOperator != null){}
    if(display.textContent == null){return}
    currentOperator = `${sign}`;
    setCurrentNumber(display.textContent)
    display.textContent = null;
}

function operate(num1, num2){
    num2 = parseInt(display.textContent)
    setCurrentNumber(num2)
    let result = null
    switch(currentOperator){
        case "+" : result = add(num1,num2); break;
        case "-" : result = subtract(num1,num2); break;
        case "*" : result = multiply(num1,num2); break;
        case "/" : result = divide(num1,num2); break;
        default : if(num2==null){break}
    }
    currentNumber1 = result;
    display.textContent = result;
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

for(let i = 0;i<numberButtons.length;i++){
    const button = numberButtons[i]
    button.addEventListener('click', () => {display.textContent+=button.textContent})
    console.log(button)
}

addButton.addEventListener("click", () => setCurrentOperator("+"));
subtractButton.addEventListener("click", () => setCurrentOperator("-"));
multiplyButton.addEventListener("click", () => setCurrentOperator("*"));
divideButton.addEventListener("click", () => setCurrentOperator("/"));
operateButton.addEventListener("click", () => operate(currentNumber1,currentNumber2));