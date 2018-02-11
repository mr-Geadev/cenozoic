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

    public currentUser: any;
    public passwords: FormGroup;
    public info: FormGroup;

    constructor(public userService: UserService,
                private msg: SystemMessageService,
                private _http: HttpClient) {

        this.userService.user$
            .subscribe((user) => {
                if (user) {
                    this.currentUser = user;
                    console.log(this.currentUser);
                }
            });

        this.passwords = new FormGroup({
            oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
        this.info = new FormGroup({
            fullName: new FormControl('', [Validators.required, Validators.minLength(10)]),
            phone: new FormControl('', [Validators.required, Validators.minLength(6)]),
            notifications: new FormGroup({
                lk: new FormControl(false),
                email: new FormControl(false)
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
                console.log(error);
                if (error.error.errorCode === "ERROR_CANT_AUTHORIZE") {
                    this.msg.info('42');
                }
            });
    }

}
