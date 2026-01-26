import { Component } from '@angular/core';
import { LandingFeatures } from '../../components/landing-features/landing-features';
import { LandingCta } from '../../components/landing-cta/landing-cta';

@Component({
  selector: 'app-landing-page',
  imports: [LandingFeatures, LandingCta],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {}
