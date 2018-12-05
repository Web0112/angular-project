import { Injectable } from "@angular/core";
import { SnotifyService, SnotifyToast } from 'ng-snotify';

@Injectable()
export class ToastService {
    constructor (private snotifyService: SnotifyService) { }

    error (error, title = '', timeout = 5000) {
        error = error.replace(/<br>/g, '');
        this.snotifyService.error(error, title, {
            timeout: timeout,
            pauseOnHover: true, 
            position: "rightTop"
        });
    }

    success (message, title = '', timeout = 5000) {
        message = message.replace(/<br>/g, '');
        this.snotifyService.success(message, title, {
            timeout: 5000,
            pauseOnHover: true, 
            position: "rightTop"
        });
    }

    confirm (title, message, cbYes:Function = null, cbNo:Function = null) {
        let 
            yes = {
                text: "Yes", 
                bold: true
            },
            no = {
                text: "No"
            };
        
        if (cbYes) {
            yes["action"] = (toast: SnotifyToast) => {
                cbYes();
                this.snotifyService.remove(toast.id);
            };
        }
        
        if (cbNo) {
            no["action"] = (toast: SnotifyToast) => {
                cbNo();
                this.snotifyService.remove(toast.id);
            };
        } else {
            no["Action"] = (toast: SnotifyToast) => {
                this.snotifyService.remove(toast.id);
            };
        }
        title = title.replace(/<br>/g, '');
        message = message.replace(/<br>/g, '');
        this.snotifyService.confirm(message, title, {
            buttons: [yes, no], 
            position: "centerTop"
        });
    }
}