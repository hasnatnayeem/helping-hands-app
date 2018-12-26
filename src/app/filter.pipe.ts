import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {

        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        
        return items.filter(function (item) {
            if (FilterPipe.isNumeric(searchText)) {
                return item.phone.includes(searchText);
            } else if (FilterPipe.isEmail(searchText)) {
                if (item.email == null) {
                    item.email = '';
                }
                return item.email != null && item.email.includes(searchText);
            }
            item.name = item.first_name + " " + item.last_name
            return item.name.toLowerCase().includes(searchText);
        });
    }

    static isNumeric(inputtxt) {
        return /^[0-9-]+$/.test(inputtxt);
    }

    static isEmail(inputtxt) {
        return inputtxt.indexOf('@') > -1;
    }
}