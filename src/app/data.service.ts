import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { RequestOptionsArgs, Headers, Http } from '@angular/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
    private server = 'https://webdev-dummy.herokuapp.com'

    private _error = new BehaviorSubject('')
    private _success = new BehaviorSubject('')
    private _username = new BehaviorSubject('')
    private _headline = new BehaviorSubject('')
    private _avatar = new BehaviorSubject('')
    private _articles = new BehaviorSubject([])
    private _avatars = new BehaviorSubject({})

    get error() { return this._error.asObservable() }
    get success() { return this._success.asObservable() }
    get username() { return this._username.asObservable() }
    get headline() { return this._headline.asObservable() }
    get avatar() { return this._avatar.asObservable() }
    get articles() { return this._articles.asObservable() }
    get avatars() { return this._avatars.asObservable() }
    public getUrl() { return this.server }

    constructor(private router: Router, private http: Http) { }

    private checkStatus(method: string, endpoint: string) {
        return (r: any) => {
            if (r.status == 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json()
                } else {
                    return r.text()
                }
            } else {
                throw new Error(`Error in ${method} ${endpoint} ${r.statusText}`)
            }
        }
    }

    private getBody(payload: any, submitJson: boolean) {
        return submitJson ? JSON.stringify(payload) : payload
    }

    private getOptions(submitJson: boolean): RequestOptionsArgs {
        const headers = new Headers()
        if (submitJson) {
            headers.append('content-type', 'application/json')
        }
        return { withCredentials: true, headers }
    }

    public get(endpoint: string): Promise<any> {
        const url = `${this.server}/${endpoint}`
        return this.http.get(url, this.getOptions(false))
            .toPromise().then(this.checkStatus('GET', endpoint))
    }

    public put(endpoint: string, payload = {}, submitJson = true): Promise<any> {
        const url = `${this.server}/${endpoint}`
        return this.http.put(url,
            this.getBody(payload, submitJson),
            this.getOptions(submitJson))
            .toPromise().then(this.checkStatus('PUT', endpoint))
    }

    public post(endpoint: string, payload = {}, submitJson = true): Promise<any> {
        const url = `${this.server}/${endpoint}`
        return this.http.post(url,
            this.getBody(payload, submitJson),
            this.getOptions(submitJson))
            .toPromise().then(this.checkStatus('POST', endpoint))
    }

    public delete(endpoint: string): Promise<any> {
        const url = `${this.server}/${endpoint}`
        return this.http.delete(url, this.getOptions(false))
            .toPromise().then(this.checkStatus('DELETE', endpoint))
    }

    public setError(message: string) {
        this._error.next(message)
        this._success.next('')
    }

    public setSuccess(message: string) {
        this._error.next('')
        this._success.next(message)
    }

    public setAvatar(avatar: string) {
        this._avatar.next(avatar)
    }

    public initialVisit() {
        this.get('headlines')
            .then(r => {
                this._username.next(r.headlines[0].username)
                this._headline.next(r.headlines[0].headline)
                this.router.navigateByUrl('/')
                this.get('avatars').then(r => this.setAvatar(r.avatars[0].avatar))
                this.getArticles()
            })
            .catch(e => {
                this._username.next('')
                this.router.navigateByUrl('/login')
            })
    }

    public handleImageChange(evt: any) {
        return new Promise((resolve, reject) => {
            evt.preventDefault()
            const file = evt.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    file, preview: reader.result,
                    fileSize: (file.size / 1024).toFixed(0)
                })
            }
            reader.readAsDataURL(file)
        })
    }

    public getArticles() {
        this.get('articles')
            .then((response: any) => {
                this.updateArticle(response.articles)

                // get avatars for everyone
                const authors = new Set(response.articles.reduce((o: any, article: any) =>
                    [...o, article.author, ...article.comments.map((c: any) => c.author)]
                    , []))
                if (authors.size > 0) {
                    const list = [...Array.from(authors)].join(',')
                    this.get(`avatars/${list}`)
                        .then((r: any) => r.avatars.reduce((o: any, s: any) => {
                            o[s.username] = s.avatar
                            return o
                        }, {}))
                        .then((a: any) => this._avatars.next(a))
                }
            })
    }

    public editArticle(articleId: number, message: string, commentId: any) {
        return new Promise((resolve, reject) => {
            const payload = { text: message }
            if (commentId) payload['commentId'] = commentId
            this.put(`articles/${articleId}`, payload)
                .then((r: any) => {
                    this.updateArticle(r.articles[0])
                    resolve()
                })
        })
    }

    public updateArticle(newArticle: any) {
        const dateSorter = (a: any, b: any) => {
            if (a.date < b.date) {
                return 1
            } else {
                return -1
            }
        }
        const sortComments = (a: any) => {
            const article = a
            article['comments'] = [...a.comments].sort(dateSorter)
            return a
        }
        const newArticles = Array.isArray(newArticle) ? newArticle :
            [... this._articles.getValue().filter((a: any) => a._id != newArticle._id), newArticle]
        this._articles.next(newArticles.map(sortComments).sort(dateSorter))
    }

}

