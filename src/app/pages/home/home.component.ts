import { Component } from '@angular/core';
import { TranslationService } from '../../language-picker/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public translationService: TranslationService) {}
}
