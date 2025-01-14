import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuConfig: any;

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch('template-config.json');
      const config = await response.json();
      console.log('Loaded config:', config); // Verifică ce se încarcă
      this.menuConfig = config.menu;
    } catch (error) {
      console.error('Error loading menu configuration:', error);
    }
  }
}