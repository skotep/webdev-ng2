import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { ProfileComponent } from './profile.component'
import { ProfileForm } from './profileForm.component'
import { AvatarComponent } from './avatar.component'

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [
        ProfileComponent, AvatarComponent, ProfileForm,
    ],
})
export class ProfileModule { }
