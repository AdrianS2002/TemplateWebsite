import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslationService } from '../language-picker/translation.service';
@Component({

    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    imports: [
        FormsModule
    ],
    styleUrl: './auth.component.css'

})
export class AuthComponent {

    isLoginMode = true;
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    translationService = inject(TranslationService)
    onSubmit(form: NgForm) {
        console.log(form.value);
        throw new Error('Method not implemented.');
        }

}