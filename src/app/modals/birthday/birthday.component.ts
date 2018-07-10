import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {LocalizationService} from '../../services/localization.service';

@Component({
    selector: 'birthday-date-picker',
    templateUrl: './birthday.component.html',
    styleUrls: ['./birthday.component.less']
})
export class BirthdayComponent implements OnInit {
    @Output() changed: EventEmitter<any> = new EventEmitter();
    @Input() dataInput?: string;

    public data: string = null;
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService,) {

    }

    public ngOnInit() {
        this.dictionary = this._localizationService.currentDictionary;
        this.data = this.dictionary.CHANGE_BIRTHDAY;
        if (this.dataInput) {
            this.dateChanged(moment(this.dataInput));
        }
    }

    public dateChanged(date: Moment): void {
        const currentDate = moment();
        const formattedDate: string = date.format('DD.MM.YYYY');
        const diffYears: number = currentDate.diff(date, 'years');
        const prefix: string = (diffYears > 4) ? 'лет' : (diffYears === 1) ? 'год' : 'года';
        this.data = `${formattedDate} (${diffYears}) ${prefix}`;
        this.changed.emit(date);
    };
}
