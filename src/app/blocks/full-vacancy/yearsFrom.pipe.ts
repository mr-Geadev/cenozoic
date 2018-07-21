import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from '../../services';

@Pipe({
    name: 'howLongFrom'
})
export class YearsFromPipe implements PipeTransform {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
        this.dictionary = this._localizationService.currentDictionary;
    }

    transform(value: any, year: any): number {
        let yearLang = value;
        if (LocalizationService.currentLang() === 'ru') {
            if ((year !== 11) && (year % 10 === 1)) {
                yearLang = 'года';
            } else {
                yearLang = 'лет';
            }
        }
        return yearLang;
    }
}
