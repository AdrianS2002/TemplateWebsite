import { Component } from '@angular/core';
import { TranslationService } from '../../language-picker/translation.service';

@Component({
  selector: 'app-terms-service',
  standalone: true,
  imports: [],
  templateUrl: './terms-service.component.html',
  styleUrl: './terms-service.component.css'
})
export class TermsServiceComponent {
constructor(public translationService: TranslationService) {}
}