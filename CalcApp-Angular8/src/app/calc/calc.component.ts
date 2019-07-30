import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
  const keyPattern = /[0-9=\+\-\*\/]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (keyPattern.test(inputChar)) {
      //TEST
console.log(inputChar);

      //Perform related function based on key pressed
    }else if(event.key=="Enter"){
      //Perform Calculate function
    }else{
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
