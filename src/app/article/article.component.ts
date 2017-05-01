import * as moment from 'moment/moment';
import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'Article',
    inputs: ['avatar', 'article'],
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

    private username = ''
    private article: any
    private avatar: string
    private date: any
    private text = ''

    private disabled = true
    private newComment = ''
    private hideComments = true
    private addComment = false

    constructor(private srv: DataService) { }

    public ngOnInit() {
        this.srv.username.subscribe(v => this.username = v)
        this.date = moment(new Date(this.article.date))
        this.text = this.article.text
    }

    public checkDisabled(evt: any) {
        this.text = evt.target.innerHTML
        this.disabled = this.article.text == this.text
    }

    public addNewComment() {
        if (this.newComment.length) {
            this.srv.editArticle(this.article._id, this.newComment, -1)
                .then((r: any) => {
                    this.newComment = ''
                    this.addComment = false
                })
        }
    }

    public editComment() {
        return (commentId: number, text: string) =>
            this.srv.editArticle(this.article._id, text, commentId)
    }

    public editArticle() {
        this.srv.editArticle(this.article._id, this.text, undefined)
            .then((r: any) => {
                this.disabled = true
            })
    }
}
