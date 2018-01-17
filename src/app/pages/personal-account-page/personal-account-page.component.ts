import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'personal-account-page',
    templateUrl: './personal-account-page.component.html',
    styleUrls: ['./personal-account-page.component.less']
})
export class PersonalAccountPageComponent implements OnInit {

    public activeTab: string = 'Резюме';

    constructor() {
    }

    ngOnInit() {


    }
}