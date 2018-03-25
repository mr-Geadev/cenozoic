import { Component } from '@angular/core';
import { CHANGE_PASSWORD, CHANGE_USER_INFO, REMOVE_USER } from "../../constants/api.constant";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { SystemMessageService } from "../../services/system-message.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'employer-setting',
    templateUrl: './employer-setting.component.html',
    styleUrls: ['./employer-setting.component.less']
})
export class EmployerSettingComponent {


    public currentUser: any = {};
    public passwords: FormGroup = null;
    public info: FormGroup = null;

    constructor(public userService: UserService,
                private msg: SystemMessageService,
                private _http: HttpClient,
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
                        }
                    }
                    this.formCreate();
                }
            });
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
                Validators.minLength(6),
                Validators.pattern(`^(\\+7([0-9]){10})$`)
            ]),
            notifications: new FormGroup({
                lk: new FormControl(this.currentUser.notifications.lk),
                email: new FormControl(this.currentUser.notifications.email),
                push: new FormControl(this.currentUser.notifications.push)
            })
        });
    }


    public changePassword(): void {
        this._http.post(CHANGE_PASSWORD, this.passwords.value)
            .subscribe(
                (res: any) => {
                    this.msg.info('Пароль изменен');
                    this.passwords.reset({
                        oldPasswords: '',
                        newPassword: ''
                    });
                }, (error: any) => {
                    if (error.error.errorCode === "ERROR_CANT_AUTHORIZE") {
                        this.msg.info('Старый пароль неверный');
                    }
                });
    }

    public changeUserInfo(): void {
        this._http.post(CHANGE_USER_INFO, this.info.value)
            .subscribe(
                (res: any) => this.msg.info('Данные изменены'),
                (err: any) => this.msg.info('Поля введены неверно, попробуйте еще раз'))
    }

    public removeUser(): void {
        this._http.get(`${REMOVE_USER}?resumeId=${this.currentUser._id}`)
            .subscribe(
                (res) => {
                    this._authService.logOut();
                    this.msg.info('Аккаунт удален');
                },
                (err) => this.msg.info('Данная фича будет добавлена позже'))
    }

}
