import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SIGN_IN, SIGN_UP, USER_INFO } from "../../constants/api.constant";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material";

@Component({
    selector: 'login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginModalComponent {

    public type: string = 'entry';

    registerForm: FormGroup;
    loginForm: FormGroup;

    constructor(private dialog: MatDialog,
                private http: HttpClient,
                private userService: UserService) {

        this.loginForm = new FormGroup({

            "email": new FormControl('', [
                Validators.required,
            ]),

            "password": new FormControl('', [
                Validators.required,
            ]),

        });
        this.registerForm = new FormGroup({

            "typeAccount": new FormControl('aspirant', [
                Validators.required,
            ]),

            "email": new FormControl('', [
                Validators.required,
                Validators.email
            ]),

            "password": new FormControl('', [
                Validators.required,
                this.passwordValidator,
            ]),

            "confirmPassword": new FormControl('', [
                Validators.required,
            ]),

        });
    }


    passwordValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value.length < 8) {
            return { "password": true };
        }
        return null;
    }

    public login(): void {
        this.http.post(SIGN_IN, this.loginForm.value)
            .subscribe((res: any) => {
                if (res.success === true) {
                    alert('Вы вошли');
                    this.userService.getUserInfo();
                    this.dialog.closeAll();
                } else {
                    alert(res.errorMessage);
                }
            });
    }

    public register(): void {
        this.http.post(SIGN_UP, this.registerForm.value)
            .subscribe((res: any) => {
                // this.confirmed = res.code === 200;

                if (res.success === true) {
                    alert('Вы зарегестрированы!');
                    this.dialog.closeAll();
                } else {
                    alert(res.errorMessage);
                    console.log(res);
                }

            })
    }
}
