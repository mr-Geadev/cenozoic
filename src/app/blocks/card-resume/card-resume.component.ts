import { Component, Input, OnInit } from '@angular/core';
import { VacancyModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'card-resume',
  templateUrl: 'card-resume.component.html',
  styleUrls: ['card-resume.component.scss'],
})
export class CardResumeComponent implements OnInit {

  @Input('resume') resume?: any;
  @Input('add-resume') add?: boolean;

  public dictionary: any = null;

  constructor(private _localization: LocalizationService) {
  }

  ngOnInit() {
    this.dictionary = this._localization.currentDictionary;

    if (this.resume) {
      if ((!this.resume.experienceTime.all) || ((this.resume.experienceTime.all.years === 0) && (this.resume.experienceTime.all.months === 0))) {
        this.resume.experienceTime.all = this.dictionary.WITHOUT_EXPERIENCE;
      } else {
        this.resume.experienceTime.all = `${this.resume.experienceTime.all.years} лет и ${this.resume.experienceTime.all.months} месяцев`;
      }
    }
  }

}
