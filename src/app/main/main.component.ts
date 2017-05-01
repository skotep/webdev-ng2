import { Component } from '@angular/core'

@Component({
    template: `
        <div class="row">
            <div class="col-sm-3">
                <Headline></Headline>
                <Following></Following>
            </div>
            <ArticlesView></ArticlesView>
        </div>
    `
})
export class MainComponent { }