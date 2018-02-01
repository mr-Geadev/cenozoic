import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material";
import { SystemMessageService } from "../../services/system-message.service";

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
                private _systemMessageService: SystemMessageService,
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

        this.userService.loginUser(this.loginForm.value);


        this.userService.user$
            .subscribe((user)=>{
                if (user) {
                    this._systemMessageService.info('Вы вошли');
                    this.dialog.closeAll();
                };
            });


    }

    public register(): void {

        this.userService.registerUser(this.registerForm.value);

        this.userService.user$
            .subscribe((user)=>{
                if (user) {
                    this._systemMessageService.info('Вы зарегестированы');
                    this.dialog.closeAll();
                }
            });
    }


}
