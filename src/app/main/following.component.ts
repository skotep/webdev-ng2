import { Component } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'Following',
    templateUrl: './following.component.html'
})
export class FollowingComponent {

    private error = ''
    private newFollower = ''
    private followers: any[] = []

    constructor(private srv: DataService) { }

    public ngOnInit() {
        this.srv.error.subscribe(v => this.error = v)
        this.fetchFollowers()
    }

    public addFollower() {
        if (this.newFollower &&
            this.followers.filter(f => f.name == this.newFollower).length == 1) {
            return this.srv.setError(`Already following ${this.newFollower}`)
        }
        this.fetchFollowers('PUT', this.newFollower)
            .then(_ => this.newFollower = '')
    }

    public deleteFollower(name: string) {
        return () => this.fetchFollowers('DELETE', name)
    }

    private fetchFollowers(method = 'GET', name = ''): Promise<any> {
        const srv = this.srv
        const url = `following${name ? `/${name}` : ''}`
        const p = method == 'PUT' ? srv.put(url) :
            method == 'DELETE' ? srv.delete(url) : srv.get(url)
        return p
            .then((r: any) => {
                if (method != 'DELETE' && name && r.following.indexOf(name) < 0) {
                    return srv.setError(`${name} cannot be followed`)
                }
                srv.setError('')
                const list = r.following.join(',')
                const followers = r.following.reduce((o: any, v: any) => {
                    o[v] = { name: v }
                    return o
                }, {})

                const promiseHeadlines = srv.get(`headlines/${list}`)
                    .then((r: any) => {
                        r.headlines.forEach((s: any) => {
                            if (followers[s.username]) {
                                followers[s.username].headline = s.headline
                            }
                        })
                    })

                const promiseAvatar = srv.get(`avatars/${list}`)
                    .then((r: any) => {
                        r.avatars.forEach((s: any) => {
                            if (followers[s.username]) {
                                followers[s.username].avatar = s.avatar
                            }
                        })
                    })

                return Promise.all([promiseHeadlines, promiseAvatar]).then(_ => {
                    this.followers = Object.keys(followers).sort().map(f => followers[f])
                    this.srv.getArticles()
                })
            })
            .catch((err: any) =>
                srv.setError(`There was an error getting your list of followed users ${err}`)
            )
    }
}