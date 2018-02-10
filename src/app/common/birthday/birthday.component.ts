import { Component, EventEmitter, Output } from "@angular/core";
import { Moment } from "moment";
import * as moment from 'moment';

@Component({
    selector: 'birthday-date-picker',
    templateUrl: './birthday.component.html',
    styleUrls: ['./birthday.component.less']
})
export class BirthdayComponent {
    @Output() changed: EventEmitter<any> = new EventEmitter();

    public data: string = 'выберите дату рождения';

    public dateChanged(date: Moment): void {
        const currentDate = moment();
        const formattedDate: string = date.format('DD.MM.YYYY');
        const diffYears: number = currentDate.diff(date, 'years');
        const prefix: string = (diffYears > 4) ? 'лет' : (diffYears === 1) ? 'год' : 'года';
        this.data = `${formattedDate} (${diffYears}) ${prefix}`;
        this.changed.emit(date);
    };
}
