import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApi } from 'api';
import { IMG_URL } from 'const';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { LocalizationService, SystemMessageService } from 'services';
import * as moment from 'moment';

@Component({
  selector: 'constructor-news',
  templateUrl: './constructor-news.component.html',
  styleUrls: ['./constructor-news.component.scss'],
})
export class ConstructorNewsComponent implements OnInit {

  IMG_URL = IMG_URL;

  @Input('edit') edit?: boolean;
  public id: string = null;
  public photoUrl: string = null;

  public news: FormGroup;
  public textNews: string;
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
  public isSaving: boolean = false;


  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  imageChangedEvent: any = '';

  constructor(private _systemMessageService: SystemMessageService,
              private activateRoute: ActivatedRoute,
              private _localizationService: LocalizationService,
              private _location: Location,
              private router: Router,
              private newsApi: NewsApi) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();

    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    if (this.id) {
      this.newsApi.getNewsById(this.id)
        .subscribe(
          res => {
            this.initForm(res['news'].title, res['news'].shortDescription, res['news'].tags);
            this.textNews = res['news'].text;
            this.photoUrl = res['news'].photoURL;
          },
        );
    } else {
      this.initForm('', '', []);
    }
  }

  public initForm(title, shortDescription, tags) {
    this.news = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      language: new FormControl(LocalizationService.currentLang(), [Validators.required]),
      shortDescription: new FormControl(shortDescription, [Validators.required]),
      tags: new FormArray([], [Validators.minLength(1)]),
    });

    tags.forEach(tag => this.addTag(tag));
  }

  public addTag(tag = this.newTag) {
    (<FormArray>this.news.get('tags')).push(
      new FormControl(tag, [Validators.required]),
    );
    this.newTag = '';
  }

  public removeTag(i: number) {
    (<FormArray>this.news.get('tags')).removeAt(i);
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
    this.isSaving = true;

    if (this.edit) {
      this.newsApi.editNews(this.id, { ...this.news.value, text: this.textNews }, this.fileToUpload.file || null)
        .subscribe(
          res => {
            this._location.back();
             this.isSaving = false;
          }
        );
    } else {
      this.newsApi.createNews(this.fileToUpload.file, { ...this.news.value, text: this.textNews })
        .subscribe(
          res => {
            this.router.navigate(['/personal-account', 'news']);
             this.isSaving = false;
            },
        );
    }
  }

}

