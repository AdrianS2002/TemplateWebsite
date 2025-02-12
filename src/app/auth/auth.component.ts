import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../language-picker/translation.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
@Component({

    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    imports: [
        FormsModule, CommonModule
    ],
    styleUrl: './auth.component.css'

})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    theme: string = 'light';
    error: string | null = null;
    successMessage: string | null = null;
    constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) { }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    translationService = inject(TranslationService)

    ngOnInit() {
        this.themeService.theme$.subscribe(theme => {
            this.theme = theme;
          });
    }
    onSubmit(form: NgForm) {
        console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        const language = navigator.language.slice(0, 2);
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        console.log("Detected theme:", theme);
        console.log("Detected language:", language);
        if (this.isLoginMode) {
            this.isLoading = true;
            this.authService.login(email, password).subscribe({
                next: (resData) => {
                    console.log('Logged in:', resData);
                    this.isLoading = false;
                    this.router.navigate(['/services']);
                },
                error: (errorMessage) => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            });
        }
        else {
            this.isLoading = true;
            this.authService.signup(email, password, language).subscribe({
                next: (resData) => {
                    console.log(resData);
                    this.isLoading = false;
                    this.isLoginMode = !this.isLoginMode;
                    this.successMessage = "Verification email sent! Please check your inbox.";
                },
                error: (errorMessage) => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            });
        }
        form.reset();
    }
    clearMessages() {
        this.error = null;
        this.successMessage = null;
    }
    onForgotPassword(emailInput: HTMLInputElement) {
        const email = emailInput.value;
        if (!email) {
            this.error = "Please enter your email.";
            return;
        }
        this.authService.resetPassword(email).subscribe({
            next: () => {
                this.successMessage = "Password reset email sent! Check your inbox.";
                this.error = null;
            },
            error: (errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;
            }
        });
    }
    
   
}