import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent {
  @Input() languages: { label: string; code: string }[] = [];
  @Output() languageSelected = new EventEmitter<string>();

  selectedLanguage: string;

  constructor(public translationService: TranslationService) {
    this.selectedLanguage = this.translationService.getLanguageName(this.translationService.currentLanguage.value);
  }

  selectLanguage(code: string): void {
    this.translationService.setLanguage(code);
    this.selectedLanguage = this.translationService.getLanguageName(code);
    this.languageSelected.emit(code);
  }
  trackByLangCode(index: number, lang: { label: string; code: string }): string {
    return lang.code;
  }
}