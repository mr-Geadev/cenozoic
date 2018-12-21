import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

import {CHANGE_PASSWORD, CHANGE_USER_INFO} from '../../const';
import {ConfirmService} from '../../services/confirm.service';
import {AuthService, LocalizationService, SystemMessageService, UserService} from '../../services';
import {BlankAccountService} from '../../services/blank-account.service';

@Component({
    selector: 'setting-worker',
    templateUrl: './setting-worker.component.html',
    styleUrls: ['./setting-worker.component.scss']
})
export class SettingWorkerComponent implements OnInit {

    public currentUser: any = {};
    public passwords: FormGroup = null;
    public info: FormGroup = null;
    public dictionary: any = {};
    public phoneMask: any[] = ['+', '7', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

    constructor(public userService: UserService,
                private msg: SystemMessageService,
                private _http: HttpClient,
                private router: Router,
                private _confirm: ConfirmService,
                private _localizationService: LocalizationService,
                private blankAccountService: BlankAccountService,
                private _dialog: MatDialog,
                private _authService: AuthService) {

        this.userService.user$
            .subscribe((user) => {
                if (user) {
                    this.currentUser = Object.assign(this.currentUser, user);
                    if (!this.currentUser.fullName) {
                        this.currentUser.fullName = '';
                    }
                    if (!this.currentUser.phone) {
                        this.currentUser.phone = '';
                    }
                    if (!this.currentUser.notifications) {
                        this.currentUser.notifications = {
                            lk: false,
                            email: false
                        };
                    }
                    this.formCreate();
                }
            });

    }

    public ngOnInit() {
      this._localizationService.currentDictionary
        .subscribe(
          res => this.dictionary = res
        );
    }

    public formCreate(): void {

        this.passwords = new FormGroup({
            oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
        });

        this.info = new FormGroup({
            fullName: new FormControl(this.currentUser.fullName, [
                Validators.required,
                Validators.minLength(10)
            ]),
            phone: new FormControl(this.currentUser.phone, [
                Validators.required,
            ]),
            notifications: new FormGroup({
                lk: new FormControl(this.currentUser.notifications.lk),
                email: new FormControl(this.currentUser.notifications.email)
            })
        });
    }

    // public onPhoneKeyPress(event: any): void {
    //     if (!( (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 43)) {
    //         event.stopPropagation();
    //         event.preventDefault();
    //     }
    // }

    public changePassword(): void {
        this._http.post(CHANGE_PASSWORD, this.passwords.value)
            .subscribe(
                (res: any) => {
                    this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_PASSWORD_IS_CHANGED);
                    this.passwords.reset({
                        oldPasswords: '',
                        newPassword: ''
                    });
                }, (error: any) => {
                    if (error.error.errorCode === 'ERROR_CANT_AUTHORIZE') {
                        this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_OLD_PASSWORD_INCORRECT);
                    }
                });
    }

    public changeUserInfo(): void {
        this._http.post(CHANGE_USER_INFO, this.info.value)
            .subscribe(
                (res: any) => {
                    this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_DATA_IS_CHANGED);
                    if (this.blankAccountService.isProtector) {
                        this.blankAccountService.compleateFilled('worker');
                    }
                    this.userService.getUserInfo();
                },
                (err: any) => this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_BAD_REQUEST));
    }

    public removeUser(): void {
        this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_DELETE_ACCOUNT)
            .subscribe(
                res => {
                    if (res) {
                        this._http.get('/api/v1/worker/account/delete')
                            .subscribe(
                                (res) => {
                                    this.userService.setUser(null);
                                    this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_ACCOUNT_DELETED);
                                    this.router.navigate(['/']);
                                },
                                (err) => this.msg.info(err.error.errorMessage)
                            );
                    }
                    this._dialog.closeAll();
                }
            );
    }

}
