import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from './location.service';
import { TranslationService } from '../../language-picker/translation.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit {
  countries: string[] = [];
  cities: string[] = [];
  selectedCountry: string = '';
  isLoading: boolean = false; 
  errorMessage: string | null = null;
  constructor(private locationService: LocationService,public translationService: TranslationService ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.locationService.getCountries().subscribe({
      next: (response) => {
        this.countries = response;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        this.errorMessage = error.message;
      }
    });
  }

  onCountrySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const country = target.value || null;

    if (!country) {
        this.selectedCountry = '';
        this.cities = [];
        return;
    }

    this.selectedCountry = country;
    this.cities = [];
    this.isLoading = true; 
    this.errorMessage = null;

    this.locationService.getCities(country).subscribe({
      next: (response) => {
        this.cities = response;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
        this.cities = [];
        this.errorMessage = error.message;
        this.isLoading = false; 
      }
    });
  }
}
