import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'employee'
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {

        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        
        return items.filter(function (item) {
            if (EmployeeFilterPipe.isNumeric(searchText)) {
                return item.phone.includes(searchText);
            } else if (EmployeeFilterPipe.isEmail(searchText)) {
                if (item.email == null) {
                    item.email = '';
                }
                return item.email != null && item.email.includes(searchText);
            }            
            return item.name.toLowerCase().includes(searchText) || item.department.toLowerCase().includes(searchText);
        });
    }

    static isNumeric(inputtxt) {
        return /^[0-9-]+$/.test(inputtxt);
    }

    static isEmail(inputtxt) {
        return inputtxt.indexOf('@') > -1;
    }
}