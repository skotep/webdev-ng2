import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main/main.component'
import { LandingComponent } from './auth/landing.component'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
    { path: 'login', component: LandingComponent },
    { path: '', component: MainComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '' },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class RoutingModule { }