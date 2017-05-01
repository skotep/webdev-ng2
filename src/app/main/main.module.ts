import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { MainComponent } from './main.component'

import { FollowingComponent } from './following.component'
import { FollowerComponent } from './follower.component'
import { HeadlineComponent } from './headline.component'

import { ArticleModule } from '../article/article.module'

@NgModule({
    imports: [BrowserModule, FormsModule, ArticleModule],
    exports: [MainComponent],
    declarations: [
        MainComponent,
        HeadlineComponent,
        FollowingComponent,
        FollowerComponent,
    ],
})
export class MainModule { }
