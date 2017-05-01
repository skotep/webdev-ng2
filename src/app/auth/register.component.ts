import { Component } from '@angular/core'
import { DataService } from '../data.service'
import { validateProfile } from '../profile/profile.component'

@Component({
    selector: 'RegisterComponent',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    constructor(private srv: DataService) { }

    public register(username: string, email: string, zipcode: string, password: string, pwconf: string) {
        if (!username || !email || !zipcode || !password || !pwconf) {
            return this.srv.setError('All fields must be supplied')
        }

        const err = validateProfile(username, email, zipcode, password, pwconf)
        if (err.length > 0) {
            return this.srv.setError(err)
        }

        this.srv.post('register', { username, email, zipcode, password })
            .then(response => this.srv.setSuccess(`Success!  You can now log in as "${response.username}".`))
            .catch(err => this.srv.setError("There was an error registering, perhaps your username is already taken?"))
    }

}