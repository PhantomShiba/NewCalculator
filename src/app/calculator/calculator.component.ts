import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from '../display/display.component';
import { KeypadComponent } from '../keypad/keypad.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, DisplayComponent, KeypadComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  displayValue = '0';
  private currentValue = '';
  private operator = '';
  private previousValue = '';

  onButtonClick(value: string) {
    if (value === 'C') {
      this.clear();
    } else if (value === '=') {
      this.calculate();
    } else if (['+', '-', '*', '/', '^', 'log', 'sin', 'cos', 'tan', 'cot'].includes(value)) {
      this.setOperator(value);
    } else {
      this.appendNumber(value);
    }
  }

  private clear() {
    this.displayValue = '0';
    this.currentValue = '';
    this.operator = '';
    this.previousValue = '';
  }

  private appendNumber(num: string) {
    if (this.displayValue === '0' || this.operator) {
      this.displayValue = num;
    } else {
      this.displayValue += num;
    }
    this.currentValue = this.displayValue;
  }

  private setOperator(op: string) {
    if (this.currentValue) {
      if (this.previousValue) {
        this.calculate();
      }
      this.previousValue = this.currentValue;
      this.currentValue = '';
    }
    this.operator = op;
  }

  private calculate() {
    let result: number;
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);

    switch (this.operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      case '^':
        result = Math.pow(prev, current);
        break;
      case 'log':
        result = Math.log(current) / Math.log(prev);
        break;
      case 'sin':
        result = Math.sin(current);
        break;
      case 'cos':
        result = Math.cos(current);
        break;
      case 'tan':
        result = Math.tan(current);
        break;
      case 'cot':
        result = 1 / Math.tan(current);
        break;
      default:
        return;
    }

    this.displayValue = result.toString();
    this.previousValue = result.toString();
    this.currentValue = '';
    this.operator = '';
  }
}
