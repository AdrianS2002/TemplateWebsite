import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: Record<string, any> = {
  };

  public currentLanguage = new BehaviorSubject<string>('en');
  language$ = this.currentLanguage.asObservable();
  public errorMessage = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadTranslations('en'); // Încarcă limba implicită
  }

   private loadTranslations(languageCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`/assets/i18/${languageCode}.json`).subscribe({
        next: (response) => {
          this.translations[languageCode] = response;
          console.log(`Loaded translations for ${languageCode}:`, response);
          this.errorMessage.next(null);
          resolve();
        },
        error: (error) => {
          console.error(`Failed to load translations for ${languageCode}:`, error);
          this.errorMessage.next(`Error: No translations found for ${languageCode}`);
          reject(error);
        },
      });
    });
  }
  async setLanguage(languageCode: string): Promise<void> {
    if (!this.translations[languageCode]) {
      await this.loadTranslations(languageCode);
    }
    this.currentLanguage.next(languageCode);
    this.errorMessage.next(null);
  }


  getTranslation(section: string, key: string): string {
    const lang = this.currentLanguage.value;
    
    if (!this.translations[lang]) {
      console.warn(`Translations for ${lang} not loaded yet.`);
      return `❌ ${key} ❌`;
    }

    const translation = this.translations[lang]?.[section]?.[key];

    if (!translation) {
      console.warn(`Missing translation for [${section}.${key}] in ${lang}`);
      return `❌ ${key} ❌`; 
    }

    return translation;
  }

  getLanguageName(languageCode: string): string {
    const lang = this.currentLanguage.value;
    return this.translations[lang]?.languagePicker?.languages?.[languageCode] || languageCode;
  }
}
