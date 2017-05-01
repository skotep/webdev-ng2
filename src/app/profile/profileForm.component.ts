import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'
import { validateProfile } from './profile.component'

@Component({
    selector: 'ProfileForm',
    templateUrl: './profileForm.component.html'
})
export class ProfileForm implements OnInit {

    private profile = {
        email: '', zipcode: '', oldEmail: '', oldZipcode: '',
        password: '', pwconf: '', dob: ''
    }

    constructor(private srv: DataService) { }

    public ngOnInit(): void {
        // TS sux
        const fields = ['zipcode', 'email', 'dob']
        fields.forEach(f => this.fetchField(f))
    }

    public updateProfile() {
        const { email, oldEmail, zipcode, oldZipcode, password, pwconf } = this.profile;
        const err = validateProfile(null,
            email == oldEmail ? '' : email,
            zipcode == oldZipcode ? '' : zipcode,
            password, pwconf)
        if (err.length > 0) {
            return this.srv.setError(err)
        }
        this.updateField('email', email)
        this.updateField('zipcode', zipcode)
        this.updateField('password', password)
    }

    private updateField(field: string, value: string) {
        if (value) {
            this.srv.put(field, { [field]: value })
                .then(r => {
                    if (field == 'password') {
                        this.profile.password = ''
                        this.profile.pwconf = ''
                        this.srv.setError('will not change password')
                    } else if (field == 'email') {
                        this.profile.oldEmail = r.email
                        this.profile.email = ''
                    } else if (field == 'zipcode') {
                        this.profile.oldZipcode = r.zipcode
                        this.profile.zipcode = ''
                    }
                })
                .then(_ => this.srv.setSuccess(''))
        }
    }

    private fetchField(field: string) {
        this.srv.get(field).then(r => {
            switch (field) {
                case 'zipcode':
                    this.profile.oldZipcode = r.zipcode; break;
                case 'email':
                    this.profile.oldEmail = r.email; break;
                case 'dob':
                    this.profile.dob = new Date(r.dob).toLocaleDateString(); break;
            }
        })
    }
}