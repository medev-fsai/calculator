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

console.log(`Result of addition of ${2} and ${3} is ${add(2,3)}`);
console.log(`Result of subtraction of ${2} from ${3} is ${subtract(2,3)}`);
console.log(`Result of multiplication of ${2} and ${3} is ${multiply(2,3)}`);
console.log(`Result of division of ${2} by ${3} is ${divide(2,3)}`);

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

console.log(`Operation ${2} + ${3} = ${operate(2,"+",3)}`);
console.log(`Operation ${2} - ${3} = ${operate(2,"-",3)}`);
console.log(`Operation ${2} * ${3} = ${operate(2,"*",3)}`);
console.log(`Operation ${2} / ${3} = ${operate(2,"/",3)}`);
function updateDateCopyRight(){
    let date = new Date();
    let footer = document.querySelector(".footer");
    footer.textContent += ` - All rights reserved ${date.getFullYear()}`;
    return;
}
updateDateCopyRight();