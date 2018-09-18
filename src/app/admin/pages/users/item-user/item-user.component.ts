import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../../models/user.model';

@Component({
    selector: 'item-user',
    templateUrl: 'item-user.component.html',
    styleUrls: ['./item-user.component.scss']
})
export class ItemUserComponent implements OnInit {

    @Input() user: UserModel;

    constructor() {
    }

    public ngOnInit() {
    }
}