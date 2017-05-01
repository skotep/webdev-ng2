import { Component } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'NewArticle',
    templateUrl: './newArticle.component.html'
})
export class NewArticleComponent {

    private disabled = false
    private message = ''
    private preview = ''
    private file: File;
    private fileSize = ''

    constructor(private srv: DataService) { }

    public handleImageChange(evt: any) {
        this.srv.handleImageChange(evt)
            .then(({ file, preview, fileSize }) => {
                this.file = file
                this.preview = preview
                this.fileSize = fileSize
            })
    }

    public addNewArticle() {
        this.disabled = true
        const fd = new FormData()
        fd.append('text', this.message)
        fd.append('image', this.file)
        this.srv.post('article', fd, false).then((r: any) => {
            const article = r.articles[0]
            this.srv.updateArticle(article)
            this.message = ''
            this.file = null
            this.fileSize = ''
            this.preview = ''
            this.disabled = false
        })
    }
}