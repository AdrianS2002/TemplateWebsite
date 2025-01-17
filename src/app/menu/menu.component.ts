import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { LanguagePickerComponent } from "../language-picker/language-picker.component";
//import { LanguageService } from '../language-picker/languageService';
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
  
  constructor(private configService: ConfigService, private sidebarService: SidebarService) {}
  async ngOnInit(): Promise<void> {
    try {
      const config = await this.configService.getConfig();
      console.log('Loaded config:', config);
      this.menuConfig = config.menu;
      this.sidebarConfig = config.sidebar;
      this.languagePickerConfig = config.languagePicker;
      console.log('Menu config:', this.menuConfig);
    } catch (error) {
      console.error('Error loading menu configuration:', error);
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(); // Call the service to toggle sidebar state
  }

  onLanguageSelected(languageCode: string): void {
   
    console.log(`Selected language: ${languageCode}`);
  }
}