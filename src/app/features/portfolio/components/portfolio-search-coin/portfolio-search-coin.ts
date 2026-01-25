import { Component, input, model } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-portfolio-search-coin',
  imports: [LucideAngularModule],
  templateUrl: './portfolio-search-coin.html',
  styleUrl: './portfolio-search-coin.css',
})
export class PortfolioSearchCoin {
  readonly Search = Search;

  value = model<string>('');

  disabled = input<boolean>(false);
  type = input<string>('text');
  touched = model<boolean>(false);
  errors = input<ValidationError[]>([]);
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  inputClass = input<string>('');

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
  }

  onBlur() {
    this.touched.set(true);
  }
}
