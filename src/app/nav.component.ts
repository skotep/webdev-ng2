import { Component } from '@angular/core'
import { DataService } from './data.service'

@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html'
})
export class NavComponent {
    private username = ''

    constructor(private srv: DataService) {
        srv.initialVisit()
        srv.username.subscribe(v => this.username = v)
    }

    public logout(): void {
        this.srv.put('logout')
            .then(e => this.srv.initialVisit())
            .catch(e => this.srv.initialVisit())
    }
}
