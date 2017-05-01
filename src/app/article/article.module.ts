import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { FilterPipe } from './filter.pipe'

import { ArticlesViewComponent } from './articlesView.component'
import { ArticleComponent } from './article.component'
import { CommentComponent } from './comment.component'
import { NewArticleComponent } from './newArticle.component'

@NgModule({
    imports: [BrowserModule, FormsModule],
    exports: [ArticlesViewComponent],
    declarations: [
        FilterPipe,
        ArticlesViewComponent,
        ArticleComponent,
        CommentComponent,
        NewArticleComponent,
    ],
})
export class ArticleModule { }
