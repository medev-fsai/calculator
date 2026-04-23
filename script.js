let operandOne = null;
let operandTwo = null;
let operator = null;
let result = null;
let state = "enteringFirstOperand";

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
    let opeRes = null;
    switch(operator){
        case "+":
            opeRes = add(operandOne, operandTwo);
            return Number(opeRes.toFixed(8));
            break;
        case "-":
            opeRes = subtract(operandOne, operandTwo);
            return Number(opeRes.toFixed(8));
            break;
        case "/":
            opeRes = divide(operandOne, operandTwo);
            return Number(opeRes.toFixed(8));
            break;
        case "*":
            opeRes = multiply(operandOne, operandTwo);
            return Number(opeRes.toFixed(8));
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