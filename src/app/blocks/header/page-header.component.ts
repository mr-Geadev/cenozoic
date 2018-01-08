import { DoCheck, Component } from '@angular/core';
import { LoginModalService } from "../../modals/login/login.service";

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements DoCheck{
    public path: any;



    constructor( private loginModalService: LoginModalService) {}

    ngDoCheck() {
        this.path = window.location.pathname;
        this.path =  this.path == "/";
    }

    public openLoginModal() {
        this.loginModalService.openModal()
    }

}
