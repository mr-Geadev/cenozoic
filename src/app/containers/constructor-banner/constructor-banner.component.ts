import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerApi } from 'api';
import { LocalizationService, SystemMessageService } from 'services';
import * as moment from 'moment';

@Component({
  selector: 'constructor-banner',
  templateUrl: './constructor-banner.component.html',
  styleUrls: ['./constructor-banner.component.scss'],
})
export class ConstructorBannerComponent implements OnInit {

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
        res => this.dictionary = res
      );

    if (this.id) {
      this.bannerApi.getBannerById(this.id)
        .subscribe(
          res => {
            this.initForm(res['banner'].title, res['banner'].shortDescription);
            this.textBanner = res['banner'].text;
            this.photoUrl = res['banner'].photoURL;
          },
        );
    } else {
      this.initForm('', '');
    }
  }

  public initForm(title, shortDescription) {
    this.banner = new FormGroup({
      title: new FormControl(title, [Validators.required]),
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
        this._systemMessageService.info('Размер файла превышает 5мб');
      }
    }
  }

  public save() {
    console.log(this.banner.value);

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

}

