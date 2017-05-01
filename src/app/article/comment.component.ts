import * as moment from 'moment/moment';
import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'Comment',
    inputs: ['comment', 'edit'],
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    private username = ''
    private avatar = ''
    private comment: any
    private date: any
    private edit: any
    private text = ''
    private disabled = true

    constructor(private srv: DataService) { }

    public ngOnInit() {
        this.srv.username.subscribe(v => this.username = v)
        this.srv.avatars.subscribe(as => this.avatar = as[this.comment.author])
        this.date = moment(new Date(this.comment.date))
        this.text = this.comment.text
    }

    public checkDisabled(evt: any) {
        this.text = evt.target.innerHTML
        this.disabled = this.comment.text == this.text
    }

    public editComment() {
        this.edit(this.comment.commentId, this.text).then((r: any) => this.disabled = true)
    }

}