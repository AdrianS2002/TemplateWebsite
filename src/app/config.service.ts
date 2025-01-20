import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private configUrl = 'template-config.json';


    async getConfig(): Promise<any> {
        try {
            const response = await fetch(this.configUrl);
            console.log('Response:', response);
            return await response.json();
        } catch (error) {
            console.error('Error loading configuration:', error);
            throw error;
        }
    }
}
