import { Component, OnInit } from '@angular/core';
import { UserService } from 'services';
import { UserModel } from '../../../models/user.model';
import { UsersApi } from './users.api';

@Component({
  selector: 'users.col',
  templateUrl: 'users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  public checkedUser: UserModel = null;
  public indexCheckedUser: number = null;
  public currentUser: any = null;
  public isShowAnalytics: boolean = false;

  constructor(public usersApi: UsersApi,
              private _userService: UserService) {
  }

  public ngOnInit() {
    this.usersApi.getUserList();
    this._userService.user$
      .subscribe(res => this.currentUser = res);
  }

  public showFullInfo(user: UserModel, index?: number): void {
    this.checkedUser = user;
    this.indexCheckedUser = index;
  }

  onShowAnalytics() {
    this.isShowAnalytics = !this.isShowAnalytics;
  }

  hiddenAnalytic() {
    this.isShowAnalytics = false;
  }
}
