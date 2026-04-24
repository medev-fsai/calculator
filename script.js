let operandOne = "";
let operandTwo = "";
let operator = null;
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
            //Edge case: imagine user typed 0 
            //Then now typed 8, the display will be 08
            //Should be only 8.
            if(operandOne === "0"){
                operandOne = input.value;
                //Store use choice in prev
                updatePrev(input.type, input.value);
                //update display
                updateDisplay(operandOne);
            }else{
                //update Operand One
                operandOne = `${operandOne}`.concat('', input.value);
                //Store use choice in prev
                updatePrev(input.type, input.value);
                //update display
                updateDisplay(operandOne);
                //return;
            }
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
            //Should be changed. 
            //If one "digit" or "digit." operate with + 0
            //If nothing, operate 0 + 0. 
            if(operandOne.length>0){
                const num1 = Number(operandOne);
                const num2 = 0;
                const result = operate(num1, "+", num2);
                initMemory();
                operandOne = result;
                updatePrev(input.type, input.value);
                //+result: ensures no non necessary zeros are after comma
                //for floating numbers. 
                updateDisplay(result);
            }else{
                updateDisplay("0");
            }
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
        //User clicked a digit and an operator
        if(input.type === "digit"){
            //User already entered operator and Operand One  
            //update Operand Two
            operandTwo = `${operandTwo}`.concat('', input.value);
            //update state
            state = "enteringSecondOperand";  
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`.concat(operator, operandTwo));
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
            //Imagine 2/= here we should understand it as 2/0 and return error.
            //Then clicked "="
            //return;
            const num1 = Number(operandOne);
            const num2 = 0;
            const result = operate(num1, operator, num2);
            if(result === "ERROR"){
                initMemory();
                updatePrev("", "");
                //Update display to user
                updateDisplay("ERROR !");
            }else{
                initMemory();
                operandOne = result;
                updatePrev(input.type, input.value);
                //+result: ensures no non necessary zeros are after comma
                //for floating numbers. 
                updateDisplay(result);
            }
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
    }else{
        //state === "enteringSecondOperand"
        //User clicked number one, operator, and at least a digit in number two
        if(input.type === "digit"){
            operandTwo = `${operandTwo}`.concat('', input.value);
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`.concat(operator, operandTwo));
            //return;
        }else if(input.type === "point"){
            if(!String(operandTwo).includes(".")){
                //Operand one contains an integer. Transform it into float
                operandTwo = `${operandTwo}`.concat('', input.value);
                //Store use choice in prev
                updatePrev(input.type, input.value);
                //update display
                updateDisplay(`${operandOne}`.concat(operator, operandTwo));
            }else{
                //Operand Two contains already a float.
                //return;
            }
        }else if(input.type === "equal"){
            //User wants the result
            const num1 = Number(operandOne);
            const num2 = Number(operandTwo);
            const result = operate(num1, operator, num2);
            if(result === "ERROR"){
                //Restart from zero, entering first number
                initMemory();
                updatePrev("", "");
                //Update display to user
                updateDisplay("ERROR !");
            }else{
                initMemory();
                operandOne = result;
                updatePrev(input.type, input.value);
                //+result: ensures no non necessary zeros are after comma
                //for floating numbers. 
                updateDisplay(result);
            }
        }else if(input.type === "operator"){
            //User wants go forward with calculation
            //Already have operand One, Operator, and operand Two
            const num1 = Number(operandOne);
            const num2 = Number(operandTwo);
            const result = operate(num1, operator, num2);
            if(result === "ERROR"){
                //Restart from zero, entering first number
                initMemory();
                updatePrev("", "");
                //Update display to user
                updateDisplay("ERROR !");
            }else{
                //String(+result) ensures if there are zeros after comma for floating numbers
                //then remove them via integer type casting
                //Then switch back to string.
                operandOne = result;
                operandTwo = "";
                operator = input.value;
                state = "enteringOperator";
                updatePrev(input.type, input.value);
                updateDisplay(`${operandOne}`.concat('', operator));
            }

        }else{
           //User wants to delete one digit or a point from Number Two. 
            operandTwo = operandTwo.slice(0, -1);
            //Imagine user clicked . then delete. operand One would be "0"
            //making a 0 display for the user which is not nice.
            //force it to be ""
            operandTwo = (operandTwo === "0") ? "" : operandTwo;
            //If operand Two had only one digit that is deleted, now it is empty
            //Go back to entering operator phase
            if(operandTwo === ""){
                state = "enteringOperator";
            }
            //Store use choice in prev
            updatePrev(input.type, input.value);
            //update display
            updateDisplay(`${operandOne}`.concat(operator, operandTwo));
            //return;
        }
    }
    
    console.log(operandOne + " : " + operator + " : " + operandTwo);
    return;
};

function initMemory(){
    operandOne = operandTwo = "";
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


function operate(operandOne, operator, operandTwo, precision=6){
    let opeRes = null;
    switch(operator){
        case "+":
            opeRes = add(operandOne, operandTwo);
            break;
        case "-":
            opeRes = subtract(operandOne, operandTwo);
            break;
        case "/":
            opeRes = divide(operandOne, operandTwo);
            break;
        case "*":
            opeRes = multiply(operandOne, operandTwo);
            break;
    }
    //UPDATE
    //Before toFixed, check how much numbers after point are there
    //ELSE, to fixed will fill the remaining gaps by zeros.
    return formatResult(opeRes, precision);
}


function formatResult(value, precision){
    //*Formatting result for the best possible display for user.
    //*Ex: 141.14-86.33 = 54.80999999999999 should become 54.809999
    //*Ex: 2.003000 should become 2.003
    if (!isFinite(value)) return "ERROR";
    let result = String(value);
    if(result.includes('.')){
        result = (result.split('.').at(-1).length > precision) ? value.toFixed(precision) : result;
        //But now : 141.14 : - : 3.36 = 137.780000
        //Should remove those zeros at the end.
        result = (result.at(-1) === "0") ? String(Number(result)) : result;
        return result;
    }else{
        return result;
    }
}

//console.log(formatResult(125.1250145128,6));
//console.log(formatResult(10.000230000,6));
//console.log(formatResult(1254.23,6));



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