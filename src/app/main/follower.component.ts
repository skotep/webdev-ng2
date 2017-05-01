import { Component } from '@angular/core'

@Component({
    selector: 'Follower',
    inputs: ['avatar', 'name', 'headline', 'delete'],
    templateUrl: './follower.component.html'
})
export class FollowerComponent {
    private avatar = 'avatar'
    private name = 'name'
    private headline = 'ehadline'
    private delete: any
}
