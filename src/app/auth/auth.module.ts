import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { ErrorMessage } from './error-message.component'
import { LoginComponent } from './login.component'
import { RegisterComponent } from './register.component'
import { LandingComponent } from './landing.component'

@NgModule({
    imports: [BrowserModule, FormsModule],
    exports: [LandingComponent],
    declarations: [
        ErrorMessage,
        LoginComponent,
        RegisterComponent,
        LandingComponent,
    ],
})
export class AuthModule { }
