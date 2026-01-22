import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly searchTerm = signal<string>('');

  setSearchTerm(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }
}
