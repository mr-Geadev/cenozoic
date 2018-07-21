import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from '../../services';

@Pipe({
    name: 'howLong'
})
export class YearsPipe implements PipeTransform {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
        this.dictionary = this._localizationService.currentDictionary;
    }

    transform(value: any, year: any): number {
        let yearLang = value;
        if (LocalizationService.currentLang() === 'ru') {
            switch (year) {
                case 2: yearLang = 'года'; break;
                case 3: yearLang = 'года'; break;
                case 4: yearLang = 'года'; break;
                case 11: yearLang = 'лет'; break;
                case 12: yearLang = 'лет'; break;
                case 13: yearLang = 'лет'; break;
                case 14: yearLang = 'лет'; break;
                default:
                    if ((year % 10 > 0 ) && (year % 10 < 5 )) {
                        yearLang = 'год';
                    } else {
                        yearLang = 'лет';
                    }
            }
        }
        return yearLang;
    }
}
