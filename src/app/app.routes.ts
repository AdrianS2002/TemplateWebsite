import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from './pages/terms-service/terms-service.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { PreferencesComponent } from './preferences/preferences.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent , },
  {path: 'privacy-policy', component: PrivacyPolicyComponent,},
  {path: 'terms-of-service', component: TermsServiceComponent, },
  {path: 'locations', component: LocationsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Default route
  {path: 'auth', component: AuthComponent},
  { path: 'preferences', component: PreferencesComponent, canActivate: [AuthGuard] }
];
