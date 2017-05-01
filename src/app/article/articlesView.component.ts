import { Component } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'ArticlesView',
    templateUrl: './articlesView.component.html'
})
export class ArticlesViewComponent {

    private articles: any[] = []
    private avatars = {}

    constructor(private srv: DataService) {
        srv.articles.subscribe(v => this.articles = v)
        srv.avatars.subscribe(v => this.avatars = v)
    }
}
