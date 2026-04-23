let operandOne = "";
let operandTwo = "";
let operator = null;
let result = "";
let state = "enteringFirstOperand";
let prev = {
    type : "",
    value: ""
};
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
    const input = getInputInfo(item);
    
    //Simple edge case "clear"
    if (input.type === "clear"){
        initMemory();
        updateDisplay("");
        return;
    }
    if(state === "enteringFirstOperand"){
        if(input.type === "digit"){
            //update Operand One
            operandOne = `${operandOne}`.concat('', input.value);
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(operandOne);
            return;
        }else if(input.type === "point"){
            //This case means user wants to enter a float
            operandOne = operandOne || "0";
            if(!String(operandOne).includes(".")){
                //Operand one contains an integer. Transform it into float
                operandOne = `${operandOne}`.concat('', input.value);
                //Store use choice in prev
                updatePrev(input.type, input.value);
                //update display
                updateDisplay(operandOne);
            }else{
                //Operand One contains already a float.
                return;
            }
        }else if(input.type === "equal"){
            //We only have one display which already contains the typed number.
            //We should exit. Operand One is still on its value.
            return;
        }else if(input.type === "operator"){
            //Now users finished typing first number

        }else {
            //User clicked "delete" to correct previous click.
            //case User clicked "clear" is already handled outside.
        }
    }else if(state === "enteringOperator"){

    }else if(state === "enteringSecondOperand"){

    }else{

    }
};

function initMemory(){
    operandOne = operandTwo = result = "";
    operator = null;
    updatePrev("", "");
    state = "enteringFirstOperand";

}

function updateDisplay(value){
    document.querySelector('.current-operation').textContent = value;
    return;
}

function updatePrev(val1, val2){
    prev.type = val1;
    prev.value= val2;
    return;
}

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