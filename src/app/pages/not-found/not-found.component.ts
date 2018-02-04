import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'not-found-page',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.less']
})
export class NotFoundPageComponent implements OnInit {
    public message: string;

    constructor() {
    }

    ngOnInit() {
        this.message = 'Not found';
    }
}