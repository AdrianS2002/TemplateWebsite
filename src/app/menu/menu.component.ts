import { ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { LanguagePickerComponent } from "../language-picker/language-picker.component";
import { TranslationService } from '../language-picker/translation.service';
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
  constructor(private configService: ConfigService, private sidebarService: SidebarService, public translationService: TranslationService,private cdr: ChangeDetectorRef) {}
  async ngOnInit(): Promise<void> {
    try {
      const config = await this.configService.getConfig();
      if (!config) throw new Error("Failed to load configuration.");
      console.log('Loaded config:', config);
      this.menuConfig = config.menu;
      this.sidebarConfig = config.sidebar;
      this.languagePickerConfig = config.languagePicker;
      console.log('Menu config:', this.menuConfig);
      this.translationService.errorMessage.subscribe(error => {
        this.errorMessage = error;
        this.cdr.detectChanges(); // Force UI update
      });
    } catch (error) {
      console.error('Error loading menu configuration:', error);
      
    }


    
  }
  onLanguageSelected(languageCode: string): void {
    console.log('Language selected:', languageCode);
    this.translationService.setLanguage(languageCode); // Schimbă limba
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(); // Call the service to toggle sidebar state
  }

  
}