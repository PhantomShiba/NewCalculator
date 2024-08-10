import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keypad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent {
  @Output() buttonClick = new EventEmitter<string>();

  buttons = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '*',
    '0', '.', 'C', '/',
    '^', 'log', 'sin',
    'cos', 'tan', 'cot', '='
  ];

  onButtonClick(value: string) {
    this.buttonClick.emit(value);
  }

  isOperator(btn: string): boolean {
    return ['+', '-', '*', '/', '^', 'log', 'sin', 'cos', 'tan', 'cot'].includes(btn);
  }
}
