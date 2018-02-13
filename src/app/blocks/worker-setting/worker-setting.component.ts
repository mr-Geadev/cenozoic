import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { CHANGE_PASSWORD, CHANGE_USER_INFO } from "../../constants/api.constant";
import { SystemMessageService } from "../../services/system-message.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'worker-setting',
    templateUrl: './worker-setting.component.html',
    styleUrls: ['./worker-setting.component.less']
})
export class WorkerSettingComponent {

    public currentUser: any = {};
    public passwords: FormGroup = null;
    public info: FormGroup = null;

    constructor(public userService: UserService,
                private msg: SystemMessageService,
                private _http: HttpClient) {

        this.userService.user$
            .subscribe((user) => {
                if (user) {
                    this.currentUser = Object.assign(this.currentUser, user);
                    if (!this.currentUser.fullName) {
                        this.currentUser.fullName = '';
                    }
                    if (!this.currentUser.phone) {
                        this.currentUser.phone = '';
                    };
                    if (!this.currentUser.notifications) {
                        this.currentUser.notifications = {
                            lk: false,
                            email: false
                        }
                    };
                    console.log(this.currentUser);
                    this.formCreate();
                }
            });
    }

    public formCreate():void {
        this.passwords = new FormGroup({
            oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
        this.info = new FormGroup({
            fullName: new FormControl(this.currentUser.fullName, [Validators.required, Validators.minLength(10)]),
            phone: new FormControl( this.currentUser.phone, [Validators.required, Validators.minLength(6)]),
            notifications: new FormGroup({
                lk: new FormControl(this.currentUser.notifications.lk),
                email: new FormControl(this.currentUser.notifications.email)
            })
        });
    }


    public changePassword(): void {
        this._http.post(CHANGE_PASSWORD, this.passwords.value)
            .subscribe((res: any) => {
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
            .subscribe((res: any) => {
                this.msg.info('Данные изменены');
            }, (error: any) => {
                this.msg.info('Поля введены неверно, попробуйте еще раз');
            });
    }

}
