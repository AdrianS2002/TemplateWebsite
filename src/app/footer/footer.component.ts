import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  footerConfig: any;

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch('template-config.json');
      const config = await response.json();
      console.log('Loaded config:', config); // Verifică ce se încarcă
      this.footerConfig = config.footer;
    } catch (error) {
      console.error('Error loading footer configuration:', error);
    }

  }
}