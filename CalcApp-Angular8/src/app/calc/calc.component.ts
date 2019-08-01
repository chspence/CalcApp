import { Component, OnInit, HostListener } from '@angular/core';
import Big from 'big.js';
import { debug } from 'util';

enum Operator {
  "None" = 0, "Plus" = 1, "Minus" = 2, "Multiply" = 3, "Divide" = 4
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  private _BigPE: number = 12;
  private _BigNE: number = -10;

  private _leftValue: Big;
  private _operator: Operator;
  private _rightValue: Big;

  leftValueDisplay: string;
  operatorDisplay: string;
  rightValueDisplay: string;

  KeyCodeToButtonId: Map<string, string>;

  constructor() {

    //NOTE: not doing this in a smaller size because I don't want it to auto-format toString to exponent
    //      handled by using private _Big* properties when formatting
    //Setup Big interface's positive and negative exponent cap before using exponential form (effects toPrecision())
    // Big.PE = 15;
    // Big.NE = -12;
    Big.PE = 100000;
    Big.NE = -100000;

    //Initialize variables
    this._leftValue = new Big(0);
    this._operator = Operator.None;
    this._rightValue = new Big(0);
    this.updateDisplayValues(false);

    //Initialize KeyCode to Button map
    this.KeyCodeToButtonId = new Map<string, string>([
      ["1", "one"],
      ["2", "two"],
      ["3", "three"],
      ["4", "four"],
      ["5", "five"],
      ["6", "six"],
      ["7", "seven"],
      ["8", "eight"],
      ["9", "nine"],
      ["0", "zero"],
      ["+", "plus"],
      ["-", "minus"],
      ["*", "multiply"],
      ["/", "divide"],
      [".", "decimal"],
      ["r", "squareroot"],
      ["s", "square"],
      ["^", "square"],
      ["n", "negate"],
      ["Enter", "equals"],
      ["Delete", "clear"],
      ["Backspace", "clear"]
    ]);
  }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log("Clicking: " + event);

    let buttonId: string = this.KeyCodeToButtonId.get(event.key);
    if (buttonId != null) {
      console.log("Clicking: " + buttonId);

      //Simulate a click of the corresponding button
      document.getElementById(buttonId).click();
    }
  }

  appendDigit(value: number) {
    // console.log("appendDigit value to rightValue: " + value + ", " + this._rightValue);

    //Validate value is 0-9 inculsive
    if (value < 0 || value > 9) {
      console.log("Invalid appendDigit value: " + value);
      return;
    }

    //Shift rightValue one decimal place left (dependig on current value's sign)
    this._rightValue.e += 1;

    // console.log("rightValue after e change: " + this._rightValue);

    //Append digit to rightValue (depending on sign, either add or subtract the additional digit)
    this._rightValue = this._rightValue.s == 1 ? this._rightValue.add(value) : this._rightValue.minus(value);

    this.updateDisplayValues(false);
  }

  setNextOperator(operator: Operator) {
    console.log("setOperator");

    //Don't allow failed-to-convert Operators to continue
    if (Operator[operator] === null || typeof Operator[operator] === 'undefined') {
      console.log("failed setOperator");
      return;
    }
    
    //Evaluate current expression before changing stored operator (don't reset and update)
    this.evaluate();

    //Set new operator
    this._operator = operator;

    this.updateDisplayValues(true);
  }

  setDecimal() {
    console.log("setDecimal");
  }

  negate() {
    console.log("negate " + this._rightValue.s);

    //Set rightValue's sign to opposite value
    this._rightValue.s = this._rightValue.s * -1;

    this.updateDisplayValues(true);
  }

  square() {
    console.log("square");
  }

  squareroot() {
    console.log("squareroot");
  }

  evaluate() {
    console.log("evaluate");

    //Calculate new leftValue
    switch (this._operator) {
      case Operator.Plus: {
        console.log("evaluate plus");
        this._leftValue = this._leftValue.add(this._rightValue);
        break;
      }
      case Operator.Minus: {
        console.log("evaluate minus");
        this._leftValue = this._leftValue.minus(this._rightValue);
        break;
      }
      case Operator.Multiply: {
        console.log("evaluate mul");
        this._leftValue = this._leftValue.mul(this._rightValue);
        break;
      }
      case Operator.Divide: {
        console.log("evaluate div");
        this._leftValue = this._leftValue.div(this._rightValue);
        break;
      }
      case Operator.None: {
        console.log("evaluate none");
        this._leftValue = Big(this._rightValue);
        break;
      }
      default: {
        console.log("Invalid operator set: " + this._operator);
        break;
      }
    }

      this._operator = Operator.None
      this._rightValue = Big(0);

      this.updateDisplayValues(false);
  }

  clear() {
    console.log("clear");

    this._leftValue = Big(0);
    this._operator = Operator.None
    this._rightValue = Big(0);

    this.updateDisplayValues(false);
  }

  private updateDisplayValues(rightAsPossibleExponent: boolean) {
    //Left Value (always uses exponent format when possible)
    if(!this._leftValue.eq(0) || this._operator != Operator.None){
      this.leftValueDisplay = this.getExponentialFormattedValue(this._leftValue);
    }else{
      this.leftValueDisplay = "-";
    }

    //Operator
    switch(this._operator){
      case Operator.Plus: {
        this.operatorDisplay = " +";
        break;
      }
      case Operator.Minus: {
        this.operatorDisplay = " -";
        break;
      }
      case Operator.Multiply: {
        this.operatorDisplay = " x";
        break;
      }
      case Operator.Divide: {
        this.operatorDisplay = " /";
        break;
      }
      default: {
        this.operatorDisplay = "";
        break;
      }
    }

    //Right Value
    if (rightAsPossibleExponent) {
      this.rightValueDisplay = this.getExponentialFormattedValue(this._rightValue);
    } else {
      this.rightValueDisplay = this._rightValue.toString();
    }
  }

  private getExponentialFormattedValue(value: Big): string {
    if (value.e > this._BigPE) {
      return value.toExponential(this._BigPE);
    } else if (this._rightValue.e < this._BigNE) {
      return value.toExponential(this._BigNE);
    } else {
      return value.toString();
    }
  }
}
