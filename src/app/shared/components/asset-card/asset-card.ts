import { Component, input } from '@angular/core';
import { CoinsIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-asset-card',
  imports: [LucideAngularModule],
  templateUrl: './asset-card.html',
  styleUrl: './asset-card.css',
})
export class AssetCard {
  readonly CoinsIcon = CoinsIcon;

  assetText = input<string>('');
  assetName = input<string>('');
  assetDescription = input<string>('');
  firstElement = input<string>('');
  firstElementDescription = input<string>('');
  secondElement = input<string>('');
  secondElementDescription = input<string>('');
  thirdElement = input<string>('');
  thirdElementDescription = input<string>('');
  fourthElement = input<string>('');
  fourthElementDescription = input<string>('');
}
