'use strict';

//Creating an array of numbers from 0 to 9
const numbers = Array(10).fill(0).map((el, i) => `${i}`);
//Checking whether an is is a number 
const isNum = (id) => numbers.some(el => el === id);
let numberSystem
//Creating main class
class Calculator {
  constructor() {
    //Input elements
    this.firstNum = null;
    this.operator = null;
    this.secondNum = null;
    //Showing the test in the text box
    this.setText = this.setText.bind(this);
    //Choosing the right action 
    this.resolve = this.resolve.bind(this);
  }

  //Showing the test in the text box
  setText(text) {
    document
      .getElementById('field')
      .innerHTML = text;
  }
  resolve(id) {
    //Clearing the text box
    if(id === "clr") {
    this.firstNum = null;
    this.operator = null;
    this.secondNum = null;
    this.setText(0);
    return;
    }
    //Entering the first number 
    if(this.firstNum === null) {
      if(isNum(id) || id === "-") {
        this.firstNum = id;
        this.setText(this.firstNum);
      }
      //Entering the operator
    } else if(this.operator === null) {
        if(isNum(id)) {
          this.firstNum += id;
          this.setText(this.firstNum);
        } else if(id === "+-") {
          //Working out +- operator
          if(this.firstNum[0] === "-") this.firstNum = this.firstNum.substring(1);
          else this.firstNum = "-" + this.firstNum;
          this.setText(this.firstNum);
        } else if(id === "1/x") {
          this.firstNum = 1 / this.firstNum;
          this.setText(this.firstNum);
        } else if(id === "clr1") {
            this.firstNum = this.firstNum.substring(0, this.firstNum.length - 1);
            this.setText(this.firstNum);
        } else if(id !== "=") {
          this.operator = id;
          this.setText(this.operator);
        }
        //Entering the second number
    } else if(this.secondNum === null) {
      if(isNum(id) || id === "-") {
        this.secondNum = id;
        this.setText(this.secondNum);
      } 
    } else if(this.secondNum !==null) {
      if(isNum(id)) {
        this.secondNum += id;
        this.setText(this.secondNum);
      } else if(id === "+-") {
        //+- operator for the second number
        if(this.secondNum[0] === "-") this.secondNum = this.secondNum.substring(1);
        else this.secondNum = "-" + this.secondNum;
        this.setText(this.secondNum);
      } else if(id === "clr1") {
        this.secondNum = this.secondNum.substring(0, this.secondNum.length - 1);
        this.setText(this.secondNum);
      }
      else if(id === "=") {
        //Finding the result
        //Evaluating the result by adding strings and using a special
        //built-in function eval()
        const result = eval(this.firstNum + this.operator + this.secondNum);
        //Writing a result into the text box
        this.setText(result);
        //First number for the next round is the result of the first
        this.firstNum = result;
        //making the operands null for the next round
        this.operator = null;
        this.secondNum = null;
      }
    }
  }
}

//Creating an instance of the calculator
const calcInst = new Calculator();
//A function which performs aactions when the button is clicked on
const performAction = buttonID => {
  calcInst.resolve(buttonID);
};

