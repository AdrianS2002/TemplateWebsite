import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private countriesApiUrl = 'https://countriesnow.space/api/v0.1/countries/positions';
  private citiesApiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

  constructor(private http: HttpClient) {}

  // Fetch a filtered list of countries (Always include Romania + 5 random)
  getCountries(): Observable<string[]> {
    return this.http.get<any>(this.countriesApiUrl).pipe(
      map(response => {
        if (!response.data) return [];
        
        const allCountries: string[] = response.data.map((country: any) => country.name);
        const romania = 'Romania';

        // Filter out Romania from the list
        const otherCountries = allCountries.filter(country => country !== romania);

        // Shuffle & Select 5 random countries
        const shuffledCountries = otherCountries
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .slice(0, 5)
          .map(({ value }) => value);

        return [romania, ...shuffledCountries];
      }),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: please try again later.`;
    } else {
      // Backend error
     //errorMessage = `Server returned code ${error.status}: ${error.message} asddsadadasdas`;
      errorMessage = `Try again later.`;

    }

    console.error(errorMessage); // Log error to console for debugging
    return throwError(() => new Error(errorMessage)); // Return error as observable
  }


  // Fetch 10 random cities from the selected country
  getCities(country: string): Observable<string[]> {
    return this.http.post<any>(this.citiesApiUrl, { country }).pipe(
      map(response => {
        if (!response.data || response.data.length === 0) return [];

        // Shuffle & Select 10 random cities
        return this.shuffleArray(response.data).slice(0, 10);
      }),
      catchError(this.handleError)
    );
  }

  // Helper function to shuffle an array
  private shuffleArray(array: string[]): string[] {
    return array
      .map(value => ({ value, sort: Math.random() })) // Assign random sorting order
      .sort((a, b) => a.sort - b.sort) // Sort by the random order
      .map(({ value }) => value); // Extract values
  }
}
