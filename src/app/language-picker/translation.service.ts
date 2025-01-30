import { Injectable } from '@angular/core';
import enTranslations from '../assets/i18/en.json';
import roTranslations from '../assets/i18/ro.json';
import esTranslations from '../assets/i18/es.json';
import itTranslations from '../assets/i18/it.json';
import deTranslations from '../assets/i18/de.json';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: Record<string, any> = {
    en: enTranslations,
    ro: roTranslations,
    es: esTranslations,
    it: itTranslations,
    de: deTranslations,
  };

  public currentLanguage = new BehaviorSubject<string>('en');
  language$ = this.currentLanguage.asObservable();
  public errorMessage = new BehaviorSubject<string | null>(null);

  setLanguage(languageCode: string): void {
    if (this.translations[languageCode]) {
      this.currentLanguage.next(languageCode);
      this.errorMessage.next(null);
    } else {
      const errorMsg = `Error: No translations found for language: ${languageCode}`;
      console.error(`No translations found for language: ${languageCode}`);
      this.errorMessage.next(errorMsg);
    }
  }

  getTranslation(section: string, key: string): string {
    const lang = this.currentLanguage.value;
    const translation = this.translations[lang]?.[section]?.[key];
    console.log(`Translation for [${section}.${key}] in ${lang}:`, translation);
    if (!translation) {
      console.warn(`Missing translation for [${section}.${key}] in ${lang}`);
      return `❌ ${key} ❌`; 
  }

    return translation || key; // Returnează cheia dacă nu există traducere
  }

  getLanguageName(languageCode: string): string {
    const lang = this.currentLanguage.value;
    const name = this.translations[lang]?.languagePicker?.languages?.[languageCode];
    return name || languageCode; // Fallback to code if translation is missing
  }
}
