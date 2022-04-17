const addButton = document.querySelector(".add-button")
const subtractButton = document.querySelector(".subtract-button")
const multiplyButton = document.querySelector(".multiply-button")
const divideButton = document.querySelector("..divide-button")

let currentOperator = "";

function setCurrentOperator(sign){
    currentOperator = `${sign}`
}

function operate(num1, num2){
    if(num1 == undefined || num2 == undefined){
        return
    }
    if(currentOperator == "add"){return num1 + num2}
    if(currentOperator == "subtract"){return num1-num2}
    if(currentOperator == "multiply"){return num1*num2}
    if(currentOperator == "divide"){
        if(num2 == 0){
            alert("You cannot divide by zero!")
        }
        else return num1/num2
    }
}

addButton.addEventListener("click", setCurrentOperator("+"));
subtractButton.addEventListener("click", setCurrentOperator("-"));
multiplyButton.addEventListener("click", setCurrentOperator("*"));
divideButton.addEventListener("click", setCurrentOperator("/"));
