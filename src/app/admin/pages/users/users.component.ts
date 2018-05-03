import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../models/user.model';
import {UsersApi} from './users.api';

@Component({
    selector: 'users.col',
    templateUrl: 'users.component.html',
    styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

    public checkedUser: UserModel = null;
    public indexCheckedUser: number = null;

    constructor(public usersApi: UsersApi) {
    }

    public ngOnInit() {
        this.usersApi.getUserList();
    }

    public showFullInfo(user: UserModel, index?: number): void {
        this.checkedUser = user;
        this.indexCheckedUser = index;
    }
}