import { Injectable } from "@angular/core";

import { ENGLISH_DICTIONARY, RUSSIAN_DICTIONARY } from "../dictionaries";
import { LANGUAGES } from "../constants";

const LOCALIZATION = 'localization';

@Injectable()
export class LocalizationService {
    public readonly currentDictionary: any = null;
    public readonly currentLanguage: string = null;

    constructor() {
        this.currentLanguage = localStorage.getItem(LOCALIZATION) || navigator.language;

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
            localStorage.setItem(LOCALIZATION, language);
            window.location.href = String(window.location.href); // Refresh page
        }
    }
}
