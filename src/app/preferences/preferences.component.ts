import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../language-picker/translation.service';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PreferencesComponent implements OnInit {
  availableLanguages: { label: string; code: string }[] = [];
  selectedLanguage: string = 'en';
  selectedTheme: string = 'light';
  userId: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    public translationService: TranslationService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.loadUserPreferences(user.id);
      }
    });

    this.themeService.theme$.subscribe(theme => {
      this.selectedTheme = theme;
    });

    try {
      this.availableLanguages = await this.translationService.getAvailableLanguages();
    } catch (error) {
      this.showError(this.translationService.getTranslation('errors', 'load_languages'));
    }
  }

  async loadUserPreferences(userId: string) {
    try {
      const userProfile = await this.databaseService.getUserProfile(userId).toPromise();
      if (userProfile) {
        this.selectedLanguage = userProfile.language || 'en';
        this.selectedTheme = userProfile.theme || 'light';
        this.translationService.setLanguage(this.selectedLanguage);
        this.themeService.setTheme(this.selectedTheme);
      }
    } catch (error) {
      this.showError(this.translationService.getTranslation('errors', 'load_preferences'));
    }
  }

  async savePreferences() {
    if (!this.userId) return;

    if (!navigator.onLine) {
      this.showError(this.translationService.getTranslation('errors', 'offline'));
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      await this.translationService.setLanguage(this.selectedLanguage, this.userId);
      await this.databaseService.updateUserTheme(this.userId, this.selectedTheme).toPromise();
      localStorage.setItem('theme', this.selectedTheme);
      document.documentElement.setAttribute('data-theme', this.selectedTheme);

      this.showSuccess(this.translationService.getTranslation('messages', 'preferences_updated'));
    } catch (error) {
      this.showError(this.translationService.getTranslation('errors', 'update_preferences'));
    } finally {
      this.isLoading = false;
    }
  }

  private showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 5000);
  }
}
