import { Component, OnInit, HostListener } from '@angular/core';
import Big from 'big.js';
import { debug } from 'util';

enum Operator {
  "plus", "minus", "div", "mul"
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  leftValue: Big;
  leftValuePositive: boolean = true;
  operator: Operator;
  rightValue: Big;
  rightValuePositive: boolean = true;

  KeyCodeToButtonId: Map<string, string>;
  constructor() {

    this.rightValue = new Big(0);
    this.rightValuePositive = true;
    this.operator = Operator.plus;
    this.rightValue = new Big(0);
    this.rightValuePositive = true;

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
    let buttonId: string = this.KeyCodeToButtonId.get(event.key);
    if (buttonId != null) {
      //TEST
      console.log("Clicking: " + buttonId);

      //Simulate a click of the corresponding button
      document.getElementById(buttonId).click();
    }
    else {
      // invalid character, prevent input
      event.preventDefault();
      //TEST
      console.log("Invalid input")
    }
  }

  appendDigit(value: number) {
    console.log("appendDigit.value: " + value);

    //Validate value is 0-9
    if (value < 0 || value > 9) {
      console.log("Invalid value in appendDigit: " + value);
      return;
    }

    //Shift rightValue one decimal place left
    this.rightValue.e += 1;

    //Append digit to rightValue
    this.rightValue.add(value);
  }

  setOperator(operator: Operator) {
    //Evaluate

    //Set operator

  }

  setDecimal() {

  }

  negate() {

  }

  square() {

  }

  squareroot() {

  }

  evaluate() {
    //Calculate new leftValue

    //Reset operator and rightValue

  }

  clear() {

  }
}
