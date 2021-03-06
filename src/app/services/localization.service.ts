import {isPlatformBrowser} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {ENGLISH_DICTIONARY, RUSSIAN_DICTIONARY} from '../dictionaries';
import {LANGUAGES} from '../constants';

const LOCALIZATION = 'localization';

@Injectable()
export class LocalizationService {
    public readonly currentDictionary: any = null;
    public readonly currentLanguage: string = null;


    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.currentLanguage = this._detectLanguage();

        switch (this.currentLanguage) {
            case LANGUAGES.RUSSIAN:
                this.currentDictionary = RUSSIAN_DICTIONARY;
                break;
            case LANGUAGES.ENGLISH:
                this.currentDictionary = ENGLISH_DICTIONARY;
                break;
        }


    }

    public setLocalization(language: string): void {
        if (Object.values(LANGUAGES).indexOf(language) > -1) {
            if (isPlatformBrowser(this.platformId)) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem(LOCALIZATION, language);
                    window.location.href = String(window.location.href); // Refresh page
                }
            }
        }
    }

    private _detectLanguage(): string {
        if (typeof window !== 'undefined') {
            if (isPlatformBrowser(this.platformId)) {
                const savedData: string = localStorage.getItem(LOCALIZATION);

                if (!savedData) {
                    if (navigator.language.indexOf('ru') > -1) {
                        return LANGUAGES.RUSSIAN;
                    }

                    if (navigator.language.indexOf('en') > -1) {
                        return LANGUAGES.ENGLISH;
                    }
                } else {
                    return savedData;
                }
            }
        }
    }
}
