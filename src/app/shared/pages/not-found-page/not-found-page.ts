import { Component } from '@angular/core';
import { CircleQuestionMark, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found-page',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage {
  readonly CircleQuestionMark = CircleQuestionMark;
}
