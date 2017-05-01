import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'

import { DataService } from './data.service'
import { AppComponent } from './app.component'
import { RoutingModule } from './routing.module'
import { NavComponent } from './nav.component'

import { MainModule } from './main/main.module'
import { ProfileModule } from './profile/profile.module'
import { AuthModule } from './auth/auth.module'

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, NavComponent],
    imports: [
        MainModule,
        AuthModule,
        ProfileModule,
        HttpModule,
        RoutingModule,
        BrowserModule
    ],
    providers: [DataService]
})
export class AppModule { }
