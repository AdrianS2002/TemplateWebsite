import { ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { LanguagePickerComponent } from "../language-picker/language-picker.component";
import { TranslationService } from '../language-picker/translation.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule, LanguagePickerComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuConfig: any;
  sidebarConfig: any;
  languagePickerConfig: any;
  errorMessage: string | null = null;
  configError: string | null = null;
  private userSub: Subscription | null = null;
  isAuthentificated = false;
  constructor(private configService: ConfigService, private sidebarService: SidebarService, public translationService: TranslationService, private cdr: ChangeDetectorRef, private authService: AuthService, private router: Router) { }
  async ngOnInit(): Promise<void> {
    try {
      const config = await this.configService.getConfig();
      if (!config) throw new Error("Failed to load configuration.");
      console.log('Loaded config:', config);
      this.menuConfig = config.menu;
      this.sidebarConfig = config.sidebar;
      this.languagePickerConfig = config.languagePicker;
      console.log('Menu config:', this.menuConfig);
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthentificated = !!user;
        console.log('User:', user);

      });
      this.translationService.errorMessage.subscribe(error => {
        this.errorMessage = error;
        this.cdr.detectChanges(); // Force UI update
      });
    } catch (error) {
      console.error('Error loading menu configuration:', error);

    }
  }
  async onLanguageSelected(languageCode: string): Promise<void> {
    console.log('Language selected:', languageCode);
    await this.translationService.setLanguage(languageCode); // Schimbă limba
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.userSub)
      this.userSub.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(); // Call the service to toggle sidebar state
  }


}