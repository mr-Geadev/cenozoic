import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../../../models/user.model";

@Component({
    selector: 'full-user-info',
    templateUrl: 'full-user-info.component.html',
    styleUrls: ['./full-user-info.component.less']
})
export class FullUserInfoComponent implements OnInit {

    @Input() user: UserModel;

    constructor() {
    }

    public ngOnInit() {
    }
}