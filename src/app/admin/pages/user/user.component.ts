import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UsersApi } from 'admin/pages/users/users.api';
import { IMG_URL } from 'const';
import { UserModel } from 'models';
import { ConfirmService, SystemMessageService } from 'services';

@Component({
  selector: 'user.col-12',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  public userId: string = '';
  public user: UserModel = null;

  imgUrl = IMG_URL;

  constructor(
    private activateRoute: ActivatedRoute,
    private _usersApi: UsersApi,
    private _confirm: ConfirmService,
    private _messages: SystemMessageService,
    private _dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.activateRoute.params
      .subscribe((params) => {
        this.userId = params['id'];
        this.getUser();
        console.log('new');
      });
  }

  public getUser() {
    this._usersApi.getUser(this.userId)
      .subscribe(res => {
        this.user = res['user'];
      });
  }

  public banUser(): void {
    this._confirm.confirm(`Вы хотите забанить аккаунт ${this.user.email} ?`)
      .subscribe((res) => {
        if (res) {
          this._usersApi.banUser(this.user._id)
            .subscribe(
              res => {
                this._messages.info('Пользователь забанен');
                this.getUser();
              },
              err => {
                this._messages.info(err.error.errorMessage);
              },
            );
        }
        this._dialog.closeAll();
      });
  }

  public unbanUser(): void {
    this._confirm.confirm(`Вы хотите разбанить аккаунт ${this.user.email} ?`)
      .subscribe((res) => {
        if (res) {
          this._usersApi.unbanUser(this.user._id)
            .subscribe(
              res => {
                this._messages.info('Пользователь забанен');
                this.getUser();
              },
              err => {
                this._messages.info(err.error.errorMessage);
              },
            );
        }
        this._dialog.closeAll();
      });
  }

  public verify(verify: boolean): void {
    this._usersApi.verificateUser(this.user._id, verify)
      .subscribe(
        res => {
          this._messages.info('Успешно');
          this.getUser();
          this.user.verify = verify;
        },
        err => {
          this._messages.info(err.error.errorMessage);
        },
      );
  }

}
