import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

@Component({
  template:` <h1>Privacy Policy</h1> `,
  standalone:true
})
export class PrivacyPolicyComponent {}

@Component({
  template:` <h1>Terms of Service</h1> `,
  standalone:true
})
export class TermsOfService {}



export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-of-service', component: TermsOfService},
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Default route
];
