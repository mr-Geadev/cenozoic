import { Component, OnInit } from '@angular/core';
import { LocalizationApi } from 'api';

@Component({
  selector: 'localization.col',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent implements OnInit {

  public readonly LANGUAGES = [
    { lang: 'ru', description: 'Русский' },
    { lang: 'en', description: 'Английский' },
  ];

  public vocabularyArray: any[] = [];
  public lang: string = 'ru';

  constructor(private localizationApi: LocalizationApi) {
  }

  ngOnInit() {
    this.initVocabulary();
  }

  changeLanguage() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.initVocabulary();
  }

  initVocabulary() {
    this.vocabularyArray = [];
    this.localizationApi.getLocalization(this.lang)
      .subscribe(res => {
        this.createVocabularyArray(res['localizationConfig']);
      });
  }

  createVocabularyArray(vocabulary): void {
    for (const key in vocabulary) {
      this.vocabularyArray.push(
        { key, value: vocabulary[key] },
      );
    }
  }

  createVocabularyObject(): any {
    const vocabulary = {};
    this.vocabularyArray.forEach((string) => {
      vocabulary[string.key] = string.value;
    });
    return vocabulary;
  }

  send() {
    this.localizationApi.updateLocalization(this.lang, this.createVocabularyObject())
      .subscribe((res) => {
        this.initVocabulary();
      });
  }

}
