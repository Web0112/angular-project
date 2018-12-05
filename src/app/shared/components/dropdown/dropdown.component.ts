import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { DropdownValue, RequestObj } from '../../../shared/model';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styles: [],    
})
export class DropdownComponent {
  @Input()
  values: DropdownValue[];
  selectedValue: string = '';

  constructor() {

  }

  selectItem(obj) {
    if (!obj.callback || typeof obj.callback !== "function") {
      return false
    }
    return obj.callback(obj.value);
  }
}