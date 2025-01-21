import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../config.service';
import { TranslationService } from '../language-picker/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  footerConfig: any;
  constructor(private configService: ConfigService, public translationService: TranslationService,private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    try {
      const config = await this.configService.getConfig();
      console.log('Loaded config:', config);
      this.footerConfig = config.footer;
       // Ascultă schimbările de limbă și actualizează interfața
       this.translationService.language$.subscribe(() => {
        console.log('Footer updated for new language');
        this.cdr.detectChanges(); // Forțează actualizarea
      });
    } catch (error) {
      console.error('Error loading footer configuration:', error);
    }
  }

}