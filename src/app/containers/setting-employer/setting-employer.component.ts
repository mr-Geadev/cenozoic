import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { CHANGE_PASSWORD, IMG_URL } from '../../const/api.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from '../../services/confirm.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizationService } from '../../services/localization.service';
import { SystemMessageService } from '../../services/system-message.service';
import { UserService } from '../../services/user.service';
import { BlankAccountService } from '../../services';

@Component({
  selector: 'setting-employer',
  templateUrl: './setting-employer.component.html',
  styleUrls: ['./setting-employer.component.scss'],
})
export class SettingEmployerComponent implements OnInit {

  imgUrl = IMG_URL;

  public dictionary: any = {};

  public currentUser: any = {};
  public passwords: FormGroup = null;
  public info: FormGroup = null;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  imageChangedEvent: any = '';

  public companyLogo: any = {
    file: null,
    data: null,
  };
  public loadingPhotoButton = ''; // текст кнопки загрузки фото

  constructor(public userService: UserService,
              private msg: SystemMessageService,
              private _http: HttpClient,
              private router: Router,
              private _dialog: MatDialog,
              private _confirm: ConfirmService,
              private _authService: AuthService,
              private blankAccountService: BlankAccountService,
              private _localizationService: LocalizationService) {

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = Object.assign(this.currentUser, user);
          if (!this.currentUser.companyContactPersonName) {
            this.currentUser.companyContactPersonName = '';
          }
          if (!this.currentUser.companyName) {
            this.currentUser.companyName = '';
          }
          if (!this.currentUser.phone) {
            this.currentUser.phone = '';
          }
          if (!this.currentUser.notifications) {
            this.currentUser.notifications = {
              lk: false,
              email: false,
              push: false,
            };
          }
          this.formCreate();
        }
      });
  }

  public ngOnInit() {
    // подклюение локализцаи
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );

    // установка текста кнопки лоаклизации из словря
    this.loadingPhotoButton = this.dictionary.LOAD_COMPANY_LOGO;
  }

  public formCreate(): void {

    this.passwords = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.info = new FormGroup({
      fullName: new FormControl(this.currentUser.fullName, [
        Validators.required,
      ]),
      companyName: new FormControl(this.currentUser.companyName, [
        Validators.required,
      ]),
      phone: new FormControl(this.currentUser.phone, [
        Validators.required,
      ]),
      notifications: new FormGroup({
        lk: new FormControl(this.currentUser.notifications.lk),
        email: new FormControl(this.currentUser.notifications.email),
        push: new FormControl(this.currentUser.notifications.push),
      }),
    });
  }

  public changePassword(): void {
    this._http.post(CHANGE_PASSWORD, this.passwords.value)
      .subscribe(
        (res: any) => {
          this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_PASSWORD_IS_CHANGED);
          this.passwords.reset({
            oldPasswords: '',
            newPassword: '',
          });
        }, (error: any) => {
          if (error.error.errorCode === 'ERROR_CANT_AUTHORIZE') {
            this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_OLD_PASSWORD_INCORRECT);
          }
        });
  }

  public changeUserInfo(): void {

    const formData: FormData = new FormData();

    if (!!this.companyLogo.file) {
      formData.append('fileToUpload', this.companyLogo.file);
    }

    const photoURL = this.currentUser.photoURL ? this.currentUser.photoURL : null;
    const userParameter = Object.assign(this.info.value, { photoURL: photoURL });

    formData.append('userParameters', JSON.stringify(userParameter));
    this._http.post('/api/v1/employer/profile/parameters/change', formData)
      .subscribe(
        (res: any) => {
          this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_DATA_IS_CHANGED);
          if (this.blankAccountService.isProtector) {
            this.blankAccountService.compleateFilled('employer');
          }
          this.userService.getUserInfo();

          this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_GO_TO_PERSONAL_ACCOUNT)
            .subscribe((confirm) => {
              if (confirm) {
                this.router.navigate(['/personal-account']);
              }
              this._dialog.closeAll();
            });
        },
        (err: any) => this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_BAD_REQUEST),
      );
  }

  public removeUser(): void {
    this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_DELETE_ACCOUNT)
      .subscribe(
        confirm => {
          if (confirm) {
            this._http.get('/api/v1/employer/account/delete')
              .subscribe(
                (res) => {
                  this.userService.setUser(null);
                  this.msg.info(this.dictionary.INFO_MESSAGES_SUCCESS_ACCOUNT_DELETED);
                  this.router.navigate(['/']);
                },
                (err) => this.msg.info(err.error.errorMessage),
              );
          }
          this._dialog.closeAll();
        },
      );
  }

  public onImageChange(event): void {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];

    if (fileList && fileList.length > 0) {
      if (file.size <= 5242880) {
        const reader = new FileReader();
        this.companyLogo.file = fileList[0];

        this.loadingPhotoButton = this.companyLogo.file.name;

        if (event.target.files && event.target.files.length > 0) {
          reader.readAsDataURL(this.companyLogo.file);
          reader.onload = () => {
            this.companyLogo.data = reader.result;
          };
        }
      } else {
        this.msg.info(this.dictionary.INFO_MESSAGES_SIZE_FILE_MORE_THAN + '5mb');
      }
    }

    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    const reader = new FileReader();

    this.companyLogo.file = new File([event.file], this.loadingPhotoButton, {type: 'image/png'});

    if (new File([event.file], this.loadingPhotoButton)) {
      reader.readAsDataURL(this.companyLogo.file);
      reader.onload = () => {
        this.companyLogo.data = reader.result;
      };
    }
  }

}
