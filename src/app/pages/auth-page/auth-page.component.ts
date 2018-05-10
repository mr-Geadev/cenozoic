import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {AuthService, LocalizationService, SystemMessageService, UserService} from '../../services';
import {Router} from '@angular/router';

@Component({
    selector: 'auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.less']
})

export class AuthPageComponent implements OnInit {

    public type: string = 'entry';
    public dictionary: any = null;

    public registerForm: FormGroup = new FormGroup({
        typeAccount: new FormControl('worker', Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, Validators.required)
    });

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    });

    constructor(private _dialog: MatDialog,
                private _systemMessageService: SystemMessageService,
                private _localizationService: LocalizationService,
                private _router: Router,
                private _userService: UserService,
                private _authService: AuthService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }

    public logIn(): void {
        this._authService.loginUser(this.loginForm.value)
            .first()
            .subscribe(
                (res) => {
                    this._userService.getUserInfo();
                    this._systemMessageService.info('Вы вошли');
                    this._router.navigate(['/']);
                    this._dialog.closeAll();
                },
                (err) => {
                    this._systemMessageService.info(err.error.errorMessage);
                }
            );
    };

    public signUp(): void {
        this._authService.registerUser(this.registerForm.value)
            .first()
            .subscribe(
                (res) => {
                    this._authService.loginUser(this.registerForm.value)
                        .subscribe((res) => {
                            this._userService.getUserInfo();
                        });
                    this._systemMessageService.info('Вы зарегистрированы');
                    this._dialog.closeAll();
                },
                (err) => {
                    this._systemMessageService.info(err.error.errorMessage);
                });

    }
}
