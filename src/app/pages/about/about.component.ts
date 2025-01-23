import { Component } from '@angular/core';
import { TranslationService } from '../../language-picker/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(public translationService: TranslationService) {}
}
