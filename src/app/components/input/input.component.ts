import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => this.search.emit(searchTerm));
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    // this.search.emit(inputValue); // emit input to home component
    this.searchSubject.next(inputValue.trim());
  }
}
