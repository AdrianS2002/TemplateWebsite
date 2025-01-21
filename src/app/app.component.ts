import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LanguagePickerComponent } from './language-picker/language-picker.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FooterComponent, SidebarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TemplateWebsite';
}
