import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LocalizationService, SystemMessageService } from '../../services';

@Component({
  selector: 'restore-password-page',
  templateUrl: './restore-password-page.component.html',
  styleUrls: ['./restore-password-page.component.scss'],
})
export class RestorePasswordPageComponent implements OnInit {

  public token: string = null;
  public dictionary: any = {};

  public restorePassword: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });

  constructor(private activateRoute: ActivatedRoute,
              private _localizationService: LocalizationService,
              private systemMessage: SystemMessageService,
              private router: Router,
              private _authService: AuthService,
              private _http: HttpClient) {
    this.token = activateRoute.snapshot.params['token'];
  }

  public ngOnInit() {

    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  saveNewPassword() {
    this._authService.saveNewPassword(this.token, this.restorePassword.value.password)
      .subscribe(
        res => {
          this.systemMessage.info('Пароль изменен');
          this.router.navigate(['/']);
        },
        res => this.systemMessage.info('Токен недействителен')
        );
  }

}
