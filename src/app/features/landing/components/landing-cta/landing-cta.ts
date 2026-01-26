import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';
@Component({
  selector: 'app-landing-cta',
  imports: [RouterLink, Button],
  templateUrl: './landing-cta.html',
  styleUrl: './landing-cta.css',
})
export class LandingCta {}
