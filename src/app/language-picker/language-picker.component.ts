import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.css'
})
export class LanguagePickerComponent {
  
  languages = input<{label: string; code: string}[]>();
  languageSelected = output<string>();

  selectLanguage(code: string): void {
    this.languageSelected.emit(code);
  }
}