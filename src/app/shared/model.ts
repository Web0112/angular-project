// Class representing DronDown's content
export class DropdownValue {
    value:string;
    label:string;
    callback: Function;
  
    constructor(value: string, label: string, callback: Function) {
      this.value    = value;
      this.label    = label;
      this.callback = callback;
    }
}

// Class representing API Request 
export class RequestObj {
  endpoint: string;
  subendpoint: string;
  method: string;
  data: Object;

  constructor(endpoint: string, subendpoint: string, method: string, data: Object) {
    this.endpoint    = endpoint;
    this.subendpoint = subendpoint;
    this.method      = method;
    this.data        = data;
  }
}