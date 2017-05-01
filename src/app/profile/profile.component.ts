import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    private error = ''
    private success = ''

    constructor(private srv: DataService) { }

    public ngOnInit() {
        this.srv.error.subscribe(v => this.error = v)
        this.srv.success.subscribe(v => this.success = v)
    }
}

export function validateProfile(username: string, email: string, zipcode: string, password: string, pwconf: string) {
    if (username) {
        if (!username.match('^[a-zA-Z][a-zA-Z0-9]+')) {
            return 'Invalid username.  Must start with a letter and can only contains letters and numbers.'
        }
    }

    if (email) {
        if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
            console.log(email)
            return 'Invalid email.  Must be like a@b.co'
        }
    }

    if (zipcode) {
        if (!zipcode.match('^[0-9]{5}$')) {
            return 'Invalid zipcode.  Must be 5 digits in length, e.g., 77005'
        }
    }

    if (password || pwconf) {
        if (password !== pwconf) {
            return 'Password do not match'
        }
        // enforce strong passwords!
    }

    return ''
}
