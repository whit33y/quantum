import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  text = input<string>('Wykonaj');
  disabled = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'disabled'>('primary');
  buttonClick = output<MouseEvent>();

  get computedClasses(): string {
    const variants: Record<string, string> = {
      primary: 'bg-linear-to-r from-indigo-500 to-purple-500 text-white',
      secondary: 'bg-linear-to-r from-purple-400 to-rose-400 text-white',
      disabled: 'bg-zinc-600 cursor-not-allowed',
    };

    return `${variants[this.variant()]}`;
  }

  onClick(ev: MouseEvent) {
    if (this.disabled()) {
      ev.preventDefault();
      return;
    }
    this.buttonClick.emit(ev);
  }
}
