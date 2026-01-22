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

  assetText = input<string | number | undefined>('');
  assetName = input<string | number | undefined>('');
  assetDescription = input<string | number | undefined>('');
  firstElement = input<string | number | undefined>('');
  firstElementDescription = input<string | number | undefined>('');
  secondElement = input<string | number | undefined>('');
  secondElementDescription = input<string | number | undefined | null>('');
  thirdElement = input<string | number | undefined>('');
  thirdElementDescription = input<string | number | undefined>('');
  fourthElement = input<string | number | undefined>('');
  fourthElementDescription = input<string | number | undefined>('');
}
