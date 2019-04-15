import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RestorePasswordService } from 'pop-ups/restore-password';
import { Location } from '@angular/common';

import { AuthService, LocalizationService, SystemMessageService, UserService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})

export class AuthPageComponent implements OnInit {

  public type: string = 'entry';
  public dictionary: any = {};
  public currentLang: string = '';
  public privacyPoliticAccepted: boolean = false;
  public subscribeToUser = null;

  public registerForm: FormGroup = new FormGroup({
    typeAccount: new FormControl('worker', Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, Validators.required),
  });

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _dialog: MatDialog,
              private _systemMessageService: SystemMessageService,
              private _localizationService: LocalizationService,
              private restorePasswordService: RestorePasswordService,
              private _router: Router,
              private _location: Location,
              private _userService: UserService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => {
          this.dictionary = res;
          this.currentLang = LocalizationService.currentLang();
        },
      );

    this.subscribeToUser = this._userService.user$.subscribe(user => {
      if (user) {
        this._location.back();
      }
    });
  }

  public logIn(): void {
    this.subscribeToUser.unsubscribe();

    this._authService.loginUser(this.loginForm.value)
      .first()
      .subscribe(
        (res) => {
          this._userService.getUserInfo();
          this._systemMessageService.info(this.dictionary.INFO_MESSAGES_SUCCESS_LOG_IN);
          this._location.back();
          this._dialog.closeAll();
        },
        (err) => {
          this._systemMessageService.info(err.error.errorMessage);
        },
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
          this._systemMessageService.info(this.dictionary.INFO_MESSAGES_SUCCESS_LOG_UP);
          this._dialog.closeAll();
        },
        (err) => {
          this._systemMessageService.info(err.error.errorMessage);
        });

  }

  public restorePassword() {
    this.restorePasswordService.restorePassword();
  }
}
