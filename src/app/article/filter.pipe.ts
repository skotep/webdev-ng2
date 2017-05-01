import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
        if (filter && filter.length) {
            return items.filter((a: any) => {
                return a.text.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
                    a.author.toLowerCase().indexOf(filter.toLowerCase()) >= 0
            })
        } else {
            return items
        }
    }
}
