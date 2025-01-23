import { Component } from '@angular/core';
import { TranslationService } from '../../language-picker/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(public translationService: TranslationService) {}
}
