import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service'

@Component({
    selector: 'ErrorMessage',
    templateUrl: 'error-message.component.html'
})
export class ErrorMessage {
    private error = ''
    private success = ''

    constructor(private srv: DataService) {
        srv.error.subscribe(v => this.error = v)
        srv.success.subscribe(v => this.success = v)
    }

}