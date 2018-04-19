import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { UserService } from "./services";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    public isAdminPanel: boolean = false;

    constructor(private userService: UserService,
                private router: Router  ) {

        router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                event.url.split('/')[1] === 'admin' ? this.isAdminPanel = true : this.isAdminPanel = false ;
            }
        });

    }

    ngOnInit(): void {
        this.userService.getUserInfo();
    }
}
