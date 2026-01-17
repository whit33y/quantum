import { Component, input, model } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  value = model<string>('');
  disabled = input<boolean>(false);
  type = input<string>('text');
  touched = model<boolean>(false);
  errors = input<ValidationError[]>([]);
  required = input<boolean>(false);
  label = input<string>('Your value');
  placeholder = input<string>('Value...');
  inputClass = input<string>('');

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
  }

  onBlur() {
    this.touched.set(true);
  }
}
