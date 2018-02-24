import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";

import { SystemMessageService, UserService } from "../../services";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginModalComponent {

    public type: string = 'entry';

    public registerForm: FormGroup;
    public loginForm: FormGroup;

    constructor(private dialog: MatDialog,
                private _systemMessageService: SystemMessageService,
                private _userService: UserService,
                private _authService: AuthService) {

        this.loginForm = new FormGroup({

            "email": new FormControl('', [
                Validators.required,
            ]),

            "password": new FormControl('', [
                Validators.required,
            ]),

        });
        this.registerForm = new FormGroup({

            "typeAccount": new FormControl('worker', [
                Validators.required,
            ]),

            "email": new FormControl('', [
                Validators.required,
                Validators.email
            ]),

            "password": new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),

            "confirmPassword": new FormControl('', [
                Validators.required,
            ]),

        });
    }

    public logIn(): void {
        this._authService.loginUser(this.loginForm.value)
            .subscribe(
                (res) => {
                    this._userService.getUserInfo();
                    this._systemMessageService.info('Вы вошли');
                    this.dialog.closeAll();
                },
                (err) => {
                    this._systemMessageService.info(err.error.errorMessage)
                }
            )
    };

    public signUp(): void {
        this._authService.registerUser(this.registerForm.value)
            .subscribe(
                (res) => {
                    this._authService.loginUser(this.registerForm.value)
                        .subscribe((res)=>{
                            this._userService.getUserInfo();
                        });
                    this._systemMessageService.info('Вы зарегистрированы');
                    this.dialog.closeAll();
                },
                (err) => {
                    this._systemMessageService.info(err.error.errorMessage);
                });

    }
}
