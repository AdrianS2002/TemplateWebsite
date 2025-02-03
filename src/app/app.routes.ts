import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from './pages/terms-service/terms-service.component';
import { LocationsComponent } from './pages/locations/locations.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-of-service', component: TermsServiceComponent},
  {path: 'locations', component: LocationsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Default route
];
