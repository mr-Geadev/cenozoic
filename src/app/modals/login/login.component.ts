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

        console.log(this.userService.loginUser(this.loginForm.value));

        if (this.userService.success) {
            alert('Вы вошли');
            this.dialog.closeAll();
        } else {
            alert('Вы не вошли');
        }

    }

    public register(): void {

        let success = this.userService.registerUser(this.registerForm.value);
        alert(success);
        if (success) {
            alert('Вы успешно зарегестрированы');
            this.userService.loginUser(this.registerForm.value)
            this.dialog.closeAll();
        }

    }
}
