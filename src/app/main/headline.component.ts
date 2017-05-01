import { Component } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'Headline',
    templateUrl: './headline.component.html'
})
export class HeadlineComponent {

    private username = ''
    private headline = ''
    private newHeadline = ''
    private avatar = ''

    constructor(private srv: DataService) {
        srv.username.subscribe(v => this.username = v)
        srv.avatar.subscribe(v => this.avatar = v)
        srv.headline.subscribe(v => this.headline = v)

    }

    public updateHeadline() {
        if (this.newHeadline) {
            this.srv.put('headline', { headline: this.newHeadline })
                .then(r => {
                    this.headline = r.headline
                    this.newHeadline = ''
                })
        }
    }

}