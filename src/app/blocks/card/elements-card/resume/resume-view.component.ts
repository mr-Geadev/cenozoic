import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit, OnChanges {

  @Input('dictionary') dictionary: any;
  @Input('resume') resume: any;

  public experienceTime: string = null;

  constructor() {
  }

  ngOnInit() {
    if (this.resume) {
      if ((!this.resume.experienceTime.all) || ((this.resume.experienceTime.all.years === 0) && (this.resume.experienceTime.all.months === 0))) {
        this.experienceTime = this.dictionary.WITHOUT_EXPERIENCE;
      } else {
        this.experienceTime = `${this.resume.experienceTime.all.years} лет и ${this.resume.experienceTime.all.months} месяцев`;
      }
    }
  }

  ngOnChanges() {
    if (this.resume) {
      if ((!this.resume.experienceTime.all) || ((this.resume.experienceTime.all.years === 0) && (this.resume.experienceTime.all.months === 0))) {
        this.experienceTime = this.dictionary.WITHOUT_EXPERIENCE;
      } else {
        this.experienceTime = `${this.resume.experienceTime.all.years} лет и ${this.resume.experienceTime.all.months} месяцев`;
      }
    }
  }
}
