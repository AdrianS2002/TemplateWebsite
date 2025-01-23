import { Component } from '@angular/core';
import { TranslationService } from '../../language-picker/translation.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
constructor(public translationService: TranslationService) {}
}
