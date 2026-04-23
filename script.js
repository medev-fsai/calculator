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
            //return;
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
                //return;
            }
        }else if(input.type === "equal"){
            //We only have one display which already contains the typed number.
            //We should exit. Operand One is still on its value.
            //return;
        }else if(input.type === "operator"){
            //If user clicks operator before typing any number
            //should default operand one to 0
            operandOne = operandOne || "0";
            //If operand One finished by "." then make it "digit.0"
            operandOne = (operandOne.at(-1) === ".") ? operandOne.slice(0, -1) : operandOne;
            //Now users finished typing first number
            state = "enteringOperator";
            operator = input.value;
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`.concat('', operator));
            //return;
        }else {
            //User clicked "delete" to correct previous click.
            //case User clicked "clear" is already handled outside code block.
            operandOne = operandOne || "0";
            //Remove last digit from number.
            operandOne = operandOne.slice(0, -1);
            //Imagine user clicked . then delete. operand One would be "0"
            //making a 0 display for the user which is not nice.
            //force it to be ""
            operandOne = (operandOne === "0") ? "" : operandOne;
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(operandOne);
            //return;
        }
    }else if(state === "enteringOperator"){
        if(input.type === "digit"){
            //User already entered operator and Operand One  
            //update Operand Two
            operandTwo = `${operandTwo}`.concat('', input.value);
            //update state
            state = "enteringSecondOperand";  
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(operandTwo);
            //return;
    
        }else if(input.type === "point"){
            //User filled operand One, operator, and now clicks "."
            //Interpret this as if he wants a second float operand
            //This is consistent with previous behavior for operand One.
            operandTwo = "0.";
            state = "enteringSecondOperand";
            //store user choice
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`.concat(operator, operandTwo));
            //return;
        }else if(input.type === "equal"){
            //User entered operand One and an operator
            //Then clicked "="
            //return;
        }else if(input.type === "operator"){
            //User already entered an operator, and is filling another
            //Interpret this as if he is changing operator.
            operator = input.value;
            //Store user choice
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`.concat('', operator));
            //return;
        }else{
            //User clicked "delete" to remove his last choice
            //Perhaps user wants to change just operator displayed (already guaranteed by clicking another operator)
            //Or wants to change operand One (MOST LIKELY)
            operator = null;
            state = "enteringFirstOperand";
            //Store user choice
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`);
            //return;

        }
    }else if(state === "enteringSecondOperand"){
        if(input.type === "digit"){

        }else if(input.type === "point"){

        }else if(input.type === "equal"){

        }else if(input.type === "operator"){
            
        }else{
            
        }
    }else{
        if(input.type === "digit"){

        }else if(input.type === "point"){

        }else if(input.type === "equal"){

        }else if(input.type === "operator"){
            
        }else{
            
        }
    }

    console.log(operandOne + " : " + operator + " : " + operandTwo);
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