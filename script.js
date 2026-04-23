let operandOne = null;
let operandTwo = null;
let operator = null;
let result = null;
let state = "enteringFirstOperand";
/*
STATES:
    - enteringFirstOperand: when forming number one.
    - enteringOperator: when forming operator.
    - enteringSecondOperand: when forming number two.
    - 
*/

updateDateCopyRight();

let buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(element => element.addEventListener("click", processUserInput));



function processUserInput(event){
    const item = event.currentTarget;
    console.log(getInputInfo(item));
};



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


function getInputInfo(item) {
    const val = item.textContent;
    const res = {
        type : "",
        value: ""
    };
    switch(val){
        case "Delete":
            res.type = res.value = "delete";
            break;
        case "Clear":
            res.type = res.value = "clear";
            break;
        case ".":
            res.type = "point";
            res.value= ".";
            break;
        case "=":
            res.type = "equal";
            res.value = "=";
            break;
        case "×":
            res.type = "operator";
            res.value= "*";
            break;
        case "+":
            res.type = "operator";
            res.value= "+";
            break;
        case "-":
            res.type = "operator";
            res.value= "-";
            break;
        case "÷":
            res.type = "operator";
            res.value= "/";
            break;
        case "0":
            res.type = "digit";
            res.value= 0;
            break;
        case "1":
            res.type = "digit";
            res.value= 1;
            break;
        case "2":
            res.type = "digit";
            res.value= 2;
            break;
        case "3":
            res.type = "digit";
            res.value= 3;
            break;
        case "4":
            res.type = "digit";
            res.value= 4;
            break;
        case "5":
            res.type = "digit";
            res.value= 5;
            break;
        case "6":
            res.type = "digit";
            res.value= 6;
            break;
        case "7":
            res.type = "digit";
            res.value= 7;
            break;
        case "8":
            res.type = "digit";
            res.value= 8;
            break;
        case "9":
            res.type = "digit";
            res.value= 9;
            break;

    }
    return res;
}