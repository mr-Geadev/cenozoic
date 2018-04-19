import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../../../models/user.model";

@Component({
    selector: 'item-user',
    templateUrl: 'item-user.component.html',
    styleUrls: ['./item-user.component.less']
})
export class ItemUserComponent implements OnInit {

    @Input() user: UserModel;
    @Input() filter?: string;

    public visible: boolean = false;

    constructor() {
    }

    public ngOnInit() {
        this.filter ? this.visible = this.user.typeAccount === this.filter : this.visible = true;
    }
}