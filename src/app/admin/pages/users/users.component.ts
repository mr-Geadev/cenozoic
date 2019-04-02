import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { publishReplay, refCount, tap } from 'rxjs/operators';
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
  public userList: UserModel[] = [];
  public defaultUserList: UserModel[] = [];

  public search: FormControl = new FormControl('');
  public search$ = this.search.valueChanges.pipe(
    tap((val) => {
      const search = String(val).toLowerCase();
      this.userList = this.defaultUserList.filter((user) => {
        if (user.typeAccount === 'worker') {
          return user.fullName && user.fullName.toLowerCase().indexOf(search) > -1;
        } else {
          return (user.companyName && user.companyName.toLowerCase().indexOf(search) > -1) ||
            (user.fullName && user.fullName.toLowerCase().indexOf(search) > -1);
        }
      });
    }),
    publishReplay(1),
    refCount(),
  );

  constructor(public usersApi: UsersApi,
              private _userService: UserService) {
  }

  public ngOnInit() {
    this.usersApi.getUserList()
      .subscribe((userList) => {
        this.defaultUserList = userList;
        this.userList = userList;
      });

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
