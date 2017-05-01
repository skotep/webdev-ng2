import { Component } from '@angular/core'

import { DataService } from '../data.service'

@Component({
    selector: 'LoginComponent',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    constructor(private srv: DataService) { }

    public loginLocal(username: String, password: String) {
        this.srv.post('login', { username, password })
            .then(d => this.srv.initialVisit())
            .catch(e => this.srv.setError(`There was an error logging in as ${username}`))
    }

    public loginFacebook() {
        window.location.href = `${this.srv.getUrl()}/auth/facebook`
    }

    public loginGoogle() {
        window.location.href = `${this.srv.getUrl()}/auth/google`
    }
}
