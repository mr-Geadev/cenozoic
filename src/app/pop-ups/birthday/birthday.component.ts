import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LocalizationService } from '../../services/localization.service';

@Component({
    selector: 'birthday-date-picker',
    templateUrl: './birthday.component.html',
    styleUrls: ['./birthday.component.scss'],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class BirthdayComponent implements OnInit {
    @Output() changed: EventEmitter<any> = new EventEmitter();
    @Input() dataInput?: string;

    public data: string = null;
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService,
                private adapter: DateAdapter<any>) {
    }

    public ngOnInit() {
        this.dictionary = this._localizationService.currentDictionary;
        this.data = this.dictionary.CHANGE_BIRTHDAY;
        if (this.dataInput) {
            this.dateChanged(moment(this.dataInput));
        }

        if (LocalizationService.currentLang() === 'ru') {
            this.adapter.setLocale('ru');
        } else {
            this.adapter.setLocale('en');
        }
    }

    public dateChanged(date: Moment): void {
        const currentDate = moment();
        const formattedDate: string = date.format('DD.MM.YYYY');
        const diffYears: number = currentDate.diff(date, 'years');
        let prefix: string = null;
        if (LocalizationService.currentLang() === 'ru') {
            prefix = (diffYears > 4) ? 'лет' : (diffYears === 1) ? 'год' : 'года';
        } else { prefix = 'years'; }
        this.data = `${formattedDate} (${diffYears}) ${prefix}`;
        this.changed.emit(date);
    }
}
