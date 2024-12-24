import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.search.emit(inputValue); // emit input to home component
  }
}
