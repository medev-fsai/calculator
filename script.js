let operandOne = null;
let operandTwo = null;
let operator = null;

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}


function operate(operandOne, operator, operandTwo){

    switch(operator){
        case "+":
            return add(operandOne, operandTwo);
            break;
        case "-":
            return subtract(operandOne, operandTwo);
            break;
        case "/":
            return divide(operandOne, operandTwo);
            break;
        case "*":
            return multiply(operandOne, operandTwo);
            break;
    }
}


function updateDateCopyRight(){
    let date = new Date();
    let footer = document.querySelector(".footer");
    footer.textContent += ` - All rights reserved ${date.getFullYear()}`;
    return;
}
updateDateCopyRight();

let buttons = Array.from(document.querySelectorAll('button'));
let digitButtons = buttons.filter(item => /num-/.test(item.getAttribute('id')));
let operatorButtons = buttons.filter(item => item.getAttribute('class') === "operator");
let deleteButton = document.querySelector('#delete');
let clearButton = document.querySelector('#clear');
let equalityButton = document.querySelector('#equal');
let pointButton = document.querySelector('#point');

digitButtons.forEach(item => item.addEventListener("click", function(){
    let operandOneValue = parseInt(item.innerText);
    updateOperandOne(operandOneValue);
    updateOperationDisplay();
}));

function updateOperandOne(value) {
    operandOne = value;
    return;
}

function updateOperationDisplay(){
    const display = document.querySelector('.current-operation');
    display.textContent = operandOne;
    return;
}