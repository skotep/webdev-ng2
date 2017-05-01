import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'Avatar',
    templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {

    private avatar = 'avatar!'
    private preview = ''
    private file: File;
    private fileSize = ''

    constructor(private srv: DataService) { }

    public ngOnInit(): void {
        this.srv.avatar.subscribe(v => this.avatar = v)
    }

    public handleImageChange(evt: any) {
        this.srv.handleImageChange(evt)
            .then(({ file, preview, fileSize }) => {
                this.file = file
                this.preview = preview
                this.fileSize = fileSize
            })
    }

    public uploadImage() {
        const fd = new FormData()
        fd.append('image', this.file)
        this.srv.put('avatar', fd, false).then(r => {
            this.srv.setAvatar(r.avatar)
            this.file = null
        })
    }

}