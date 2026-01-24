import { Component, input } from '@angular/core';
import { Eye, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-watch-list-info',
  imports: [LucideAngularModule],
  templateUrl: './watch-list-info.html',
  styleUrl: './watch-list-info.css',
})
export class WatchListInfo {
  readonly Eye = Eye;
  lastAddedCoin = input<string>();
  watchListCount = input<number>();
}
