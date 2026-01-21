import { Component, ElementRef, HostListener } from '@angular/core';
import { LucideAngularModule, User, Search, Settings, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-nav',
  imports: [LucideAngularModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  readonly User = User;
  readonly Search = Search;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  isMenuOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
