import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute,NavigationEnd, RouterLink } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { TranslationService } from '../language-picker/translation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarConfig: any;
  currentPage: string = '';
  isExpanded: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public sidebarService: SidebarService, public translationService: TranslationService,private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch('template-config.json');
      const config = await response.json();
      this.sidebarConfig = config.sidebar;

      // Setează currentPage inițial
      this.currentPage = this.router.url.split('?')[0]; // Rutează fără parametri de query
      console.log(`Initial page: ${this.currentPage}`);

      // Ascultă evenimentele de navigare
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentPage = this.router.url.split('?')[0];
          console.log(`Updated page: ${this.currentPage}`);
          console.log(`Updated page: ${this.currentPage}`);
          this.cdr.detectChanges(); // Forțează actualizarea pentru pagină
        }
      });
      
      // Ascultă starea sidebar-ului
      this.sidebarService.isExpanded$.subscribe((state) => {
        this.isExpanded = state;
      });

      this.translationService.language$.subscribe(() => {
        console.log('Sidebar updated for new language');
        this.cdr.detectChanges(); // Forțează actualizarea pentru traduceri
      });
    } catch (error) {
      console.error('Error loading sidebar configuration:', error);
    }
  }
}
