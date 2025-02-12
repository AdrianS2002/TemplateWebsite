import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAubzKJeHlwP8OHFZvx9NbcAwbfbtsGjdQ",
  authDomain: "templatewebsite-3e4ee.firebaseapp.com",
  databaseURL: "https://templatewebsite-3e4ee-default-rtdb.firebaseio.com",
  projectId: "templatewebsite-3e4ee",
  storageBucket: "templatewebsite-3e4ee.appspot.com",
  messagingSenderId: "722715285210",
  appId: "1:722715285210:web:5fed25b07716267df5f7e3",
  measurementId: "G-RMHMD8KE9V"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), 
    { provide: AuthInterceptorService, useClass: AuthInterceptorService },

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
}).catch(err => console.error(err));
