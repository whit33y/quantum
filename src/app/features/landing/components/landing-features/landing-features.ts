import { Component } from '@angular/core';
import { Globe, LucideAngularModule, Shield, Zap } from 'lucide-angular';

@Component({
  selector: 'app-landing-features',
  imports: [LucideAngularModule],
  templateUrl: './landing-features.html',
  styleUrl: './landing-features.css',
})
export class LandingFeatures {
  readonly features = [
    {
      icon: Zap,
      title: 'Lightning Speed',
      description: 'Experience our optimized architecture using Coingecko API and modern Angular featues.',
    },
    {
      icon: Shield,
      title: 'Full Security',
      description: 'Your data is protected by Appwrite.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Use the platform wherever you are, without any limitations.',
    },
  ];
}
