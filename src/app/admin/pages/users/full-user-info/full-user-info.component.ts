import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmService } from '../../../../services/confirm.service';
import { UserModel } from '../../../../models/user.model';
import { SystemMessageService, UserService } from '../../../../services';
import { UsersApi } from '../users.api';

@Component({
  selector: 'full-user-info',
  templateUrl: 'full-user-info.component.html',
  styleUrls: ['./full-user-info.component.scss'],
})
export class FullUserInfoComponent implements OnInit {

  @Input() user: UserModel;
  @Input() index: number;
  @Input() isAdmin: boolean;
  @Input() isShowAnalytics: boolean;
  @Output() onShowAnalytics = new EventEmitter<void>();

  constructor(private _usersApi: UsersApi,
              private _confirm: ConfirmService,
              private _messages: SystemMessageService,
              private _dialog: MatDialog) {
  }

  public ngOnInit() {}

  public banUser(): void {
    this._confirm.confirm(`Вы хотите забанить аккаунт ${this.user.email} ?`)
      .subscribe((res) => {
        if (res) {
          this._usersApi.banUser(this.user._id)
            .subscribe(
              res => {
                this._messages.info('Пользователь забанен');
                this._usersApi.userList[this.index].status = 9;
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
          this.user.verify = verify;
        },
        err => {
          this._messages.info(err.error.errorMessage);
        },
      );
  }

  showAnalytics() {
    this.onShowAnalytics.emit();
  }
}
