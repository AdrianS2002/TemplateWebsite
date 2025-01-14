import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  footerConfig: any;
  constructor(private configService: ConfigService) {}

  async ngOnInit(): Promise<void> {
    try {
      const config = await this.configService.getConfig();
      console.log('Loaded config:', config);
      this.footerConfig = config.footer;
    } catch (error) {
      console.error('Error loading footer configuration:', error);
    }
  }
}