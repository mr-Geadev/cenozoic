import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerApi } from 'api';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { LocalizationService, SystemMessageService } from 'services';
import * as moment from 'moment';
import { IMG_URL } from 'const/api.constant';

@Component({
  selector: 'constructor-banner',
  templateUrl: './constructor-banner.component.html',
  styleUrls: ['./constructor-banner.component.scss'],
})
export class ConstructorBannerComponent implements OnInit {

  public IMG_URL = IMG_URL;

  @Input('edit') edit?: boolean;
  public id: string = null;
  public photoUrl: string = null;

  public banner: FormGroup;
  public textBanner: string;
  public newTag: string;
  public currentLang: string;
  public currentDate: any = moment(new Date());
  public textEditorConfig: any = {}; // для RichTextComponent'ы
  public fileToUpload: any = {
    file: null,
    data: null,
  };
  public dictionary: any = {};
  public nameOfFile: string = null;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  imageChangedEvent: any = '';

  constructor(private _systemMessageService: SystemMessageService,
              private activateRoute: ActivatedRoute,
              private _localizationService: LocalizationService,
              private router: Router,
              private _location: Location,
              private bannerApi: BannerApi) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();

    this._localizationService.currentDictionary
      .subscribe(
        res => {
          this.dictionary = res;
          this.currentLang = LocalizationService.currentLang();
        }
      );

    if (this.id) {
      this.bannerApi.getBannerById(this.id)
        .subscribe(
          res => {
            this.initForm(res['banner'].title, res['banner'].shortDescription, res['banner'].imageUrl || '');
            this.textBanner = res['banner'].text;
            this.photoUrl = res['banner'].photoURL;
          },
        );
    } else {
      this.initForm('', '', '');
    }
  }

  public initForm(title, shortDescription, imageUrl) {
    this.banner = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      imageUrl: new FormControl(imageUrl, [Validators.pattern('(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      language: new FormControl(LocalizationService.currentLang(), [Validators.required]),
      shortDescription: new FormControl(shortDescription, [Validators.required]),
    });
  }

  public addFile(event): void {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];

    if (fileList && fileList.length > 0) {
      if (file.size <= 300000) {
        const reader = new FileReader();

        this.fileToUpload.file = fileList[0];
        this.nameOfFile = this.fileToUpload.file.name;
        if (event.target.files && event.target.files.length > 0) {
          reader.readAsDataURL(this.fileToUpload.file);
          reader.onload = () => {
            this.fileToUpload.data = reader.result;
          };
        }
      } else {
        this._systemMessageService.info(this.dictionary.INFO_MESSAGES_SIZE_FILE_MORE_THAN + '5mb');
      }
    }

    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    const reader = new FileReader();

    this.fileToUpload.file = new File([event.file], this.nameOfFile, {type: 'image/png'});

    if (new File([event.file], this.nameOfFile)) {
      reader.readAsDataURL(this.fileToUpload.file);
      reader.onload = () => {
        this.fileToUpload.data = reader.result;
      };
    }
  }

  public save() {
    if (this.edit) {
      this.bannerApi.editBanner(this.id, { ...this.banner.value, text: this.textBanner }, this.fileToUpload.file || null)
        .subscribe(
          res => { this._location.back(); },
        );
    } else {
      this.bannerApi.createBanner(this.fileToUpload.file, { ...this.banner.value, text: this.textBanner })
        .subscribe(
          res => { this.router.navigate(['/personal-account', 'banners']); },
        );
    }
  }

  show() {
    console.log(this.textBanner)
  }

}

