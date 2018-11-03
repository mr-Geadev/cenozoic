import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsApi } from 'api';
import { LocalizationService, SystemMessageService } from 'services';
import * as moment from 'moment';

@Component({
  selector: 'constructor-news',
  templateUrl: './constructor-news.component.html',
  styleUrls: ['./constructor-news.component.scss'],
})
export class ConstructorNewsComponent implements OnInit {

  public news: FormGroup;
  public textNews: string;
  public currentLang: string;
  public currentDate: any = moment(new Date());
  public textEditorConfig: any = {}; // для RichTextComponent'ы
  public fileToUpload: any = {
    file: null,
    data: null,
  };
  public nameOfFile: string = null;

  constructor(private _systemMessageService: SystemMessageService,
              private router: Router,
              private newsApi: NewsApi) {
  }

  ngOnInit() {
    this.news = new FormGroup({
      title: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
    });
    this.currentLang = LocalizationService.currentLang();
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
    console.log(this.news.value);

    this.newsApi.createNews(this.fileToUpload.file, { ...this.news.value, text: this.textNews })
      .subscribe(
        res => { this.router.navigate(['/personal-account']);},
      );
  }

}

