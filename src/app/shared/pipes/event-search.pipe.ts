import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventSearch'
})
export class EventSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toString().toLowerCase();
    console.log(items);
    return items.filter( it => {
      return it.IPAddress ? it.IPAddress.toString().toLowerCase().includes(searchText) : false;
    });
  }

}
