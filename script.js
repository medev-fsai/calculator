let operandOne = null;
let operandTwo = null;
let operator = null;
let result = null;

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
            return Number(opeRes.toFixed(6));
            break;
        case "-":
            opeRes = subtract(operandOne, operandTwo);
            return Number(opeRes.toFixed(6));
            break;
        case "/":
            opeRes = divide(operandOne, operandTwo);
            return Number(opeRes.toFixed(6));
            break;
        case "*":
            opeRes = multiply(operandOne, operandTwo);
            return Number(opeRes.toFixed(6));
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
    if(checkOperatorIsNull()){
        let operandOneValue = item.innerText;
        const display = updateOperandOne(operandOneValue);
        updateLowerDisplay(display);
    }else if(checkResultIsNull()){
        let operandTwoValue = item.innerText;
        const display = updateOperandTwo(operandTwoValue);
        updateLowerDisplay(display);
    }else {
        console.log("****");
    }
}));

function updateOperandOne(value) {
    operandOne = operandOne ?? 0; 
    operandOne = parseInt(`${operandOne}` + value);
    console.log("Operand One " + operandOne);
    return operandOne;
}

function updateOperandTwo(value) {
    operandTwo = operandTwo ?? 0;
    operandTwo = parseInt(`${operandTwo}` + value);
    console.log("Operand Two " + operandTwo);
    return operandTwo;
}

function checkOperandOneIsNull(){
    return operandOne === null;
}
function checkOperandTwoIsNull(){
    return operandTwo === null;
}
function checkOperatorIsNull(){
    return operator === null;
}
function checkResultIsNull(){
    return result === null;
}

function updateOperator(value){
    switch(value){
        case "add":
            operator = "+";
            break;
        case "subtract":
            operator = "-";
            break;
        case "divide":
            operator = "/";
            break;
        case "multiply":
            operator = "*";
            break;
        default:
            operator = "+";
            break;
    }
}   

function updateLowerDisplay(value){
    const display = document.querySelector('.current-operation');
    display.textContent = value;
    return;
}

function clearLowerDisplay(){
    document.querySelector('.current-operation').textContent = "";
    return;
}

function updateUpperDisplay(){
    clearUpperDisplay();
    const upperDisplay = document.querySelector(".last-operation");
    let operandOneDisplayValue = operandOne;
    let operandTwoDisplayValue = operandTwo;
    let operatorDisplayValue = operator;
    operandOneDisplayValue = operandOneDisplayValue ?? "";
    operatorDisplayValue = operatorDisplayValue ?? "";
    operandTwoDisplayValue = operandTwoDisplayValue ?? "";
    //Add formatting before display
    //multiplication appears as "*", and division as "/"
    //But we want multiplication to be "&times;" and division to be "&divide;"
    //operatorDisplayValue = formatOperator(operatorDisplayValue);
    upperDisplay.textContent += `${operandOneDisplayValue}${operatorDisplayValue}${operandTwoDisplayValue}`;
    return; 
}

function clearUpperDisplay(){
    document.querySelector('.last-operation').textContent = "";
    return;
}

//console.log(operatorButtons);
operatorButtons.forEach(item => item.addEventListener("click", function() {
    
    let operation = item.getAttribute('id');
    console.log("Clicked ****** " + operation);
    if(checkOperatorIsNull() || checkOperandTwoIsNull()){
        updateOperator(operation);
        clearLowerDisplay();
        updateUpperDisplay();
    }else if(checkResultIsNull()){
        //This simulates the third click before any equality click
        //Check if result is null.
        //If it is the case, then make operation.
        proceedOperation();
        clearLowerDisplay();
        operandOne = result;
        operandTwo = null;
        result = null;
        updateOperator(operation);
        updateUpperDisplay();
        //console.log("operand One is " + operandOne);
        //console.log("Operator is " + operator);
        //console.log("Operand Two is " + operandTwo);
    }else{
        //we have operand one, operand two and result.
        //Simulate when we click an operator after we clicked equality.
        clearLowerDisplay();
        operandOne = result;
        operandTwo = null;
        result = null;
        updateOperator(operation);
        updateUpperDisplay();
    }
}));

equalityButton.addEventListener("click", function(){
    proceedOperation();
    updateLowerDisplay(result);
    updateUpperDisplay();
});

function proceedOperation(){
    let proceed = (!checkOperandOneIsNull()) && (!checkOperatorIsNull()) && (!checkOperandTwoIsNull());
    if(proceed){
        //Operation is ready to be made
        result = operate(operandOne, operator, operandTwo);
        //updateLowerDisplay(result);
        //updateUpperDisplay();
    }
    return;
}

/*
function formatOperator(value){
    return value === "*" ? '&times;'  : 
           value === "/" ? '&divide;' : value;
}
*/