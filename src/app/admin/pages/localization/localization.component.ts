import { Component, OnInit } from '@angular/core';
import { LocalizationApi } from 'api';
import { zip } from 'rxjs/internal/observable/zip';

@Component({
  selector: 'localization.col',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent implements OnInit {

  public keysOfLocalization: string[] = [];
  public enVocabulary: any = null;
  public ruVocabulary: any = null;
  public lang: string = 'ru';

  constructor(private localizationApi: LocalizationApi) {
  }

  ngOnInit() {
    this.initVocabulary();
  }

  // changeLanguage() {
  //   this.lang = this.lang === 'en' ? 'ru' : 'en';
  //   this.initVocabulary();
  // }

  initVocabulary() {
    this.keysOfLocalization = [];
    zip(
      this.localizationApi.getLocalization('ru'),
      this.localizationApi.getLocalization('en'),
    )
      .subscribe(res => {
        this.createKeysOfLocalization(res[0]['localizationConfig']);
        this.ruVocabulary = res[0]['localizationConfig'];
        this.enVocabulary = res[1]['localizationConfig'];
      });
  }

  createKeysOfLocalization(vocabulary): void {
    for (const key in vocabulary) {
      this.keysOfLocalization.push(
        key
      );
    }
  }

  send() {
    zip(
      this.localizationApi.updateLocalization('ru', this.ruVocabulary),
      this.localizationApi.updateLocalization('en', this.enVocabulary)
    )
      .subscribe(() => {
        this.initVocabulary();
      });
  }

}
