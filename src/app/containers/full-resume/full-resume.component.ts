import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ResumeApi } from 'api';
import * as moment from 'moment';
import { PayingModalService } from 'pop-ups/paying';

import { ConfirmService, LocalizationService, ResumeService, UserService } from '../../services';
import { CitiesService } from '../../services/cities.service';
import { PopupsService } from '../../services/popups.service';
// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'full-resume',
  templateUrl: './full-resume.component.html',
  styleUrls: ['./full-resume.component.scss'],
})
export class FullResumeComponent implements OnInit {

  public dictionary: any = {};
  public currentResume: any;
  public currentUser: any;
  private id: string = null;
  public nationalitiesDefault: any[] = null;
  isBrowser;

  public showContactData: boolean = false;

  constructor(public resumeService: ResumeService,
              public resumeApi: ResumeApi,
              public userService: UserService,
              public citiesService: CitiesService,
              private activateRoute: ActivatedRoute,
              public responds: PopupsService,
              private http: HttpClient,
              public confirmService: ConfirmService,
              private _dialog: MatDialog,
              private payingModalService: PayingModalService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {

    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );

    this.http.get('/assets/json/nationalities.json')
      .subscribe(
        (nationalities: any) => {
          this.nationalitiesDefault = nationalities.list;
        });

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
        }
      });

    this.resumeApi.getResumeById(this.id);

    this.resumeApi.viewedResume$
      .filter(resume => !!resume)
      .subscribe((resume) => {
        this.currentResume = resume;
        this.currentResume.age = this.getAge(this.currentResume.birthday);
        this.currentResume.birthdayNormal = this.setBirthday(this.currentResume.birthday);
        this.showContactData = !!this.currentResume.email;
        this.calculateTimeRange();
      });
  }

  public calculateTimeRange() {
    this.currentResume.experience.forEach(workPlace => {
      const startDate = moment([workPlace.startYear, workPlace.startMonth]);
      let endDate = moment();
      if (!workPlace.present) {
        endDate = moment([workPlace.endYear, workPlace.endMonth]);
      }
      const diffMonths = moment.duration(endDate.diff(startDate)).asMonths();

      let years: any = Math.floor(diffMonths / 12);
      if ((Math.floor(years % 10) > 0) && (Math.floor(years % 10) < 5)) {
        years = years + ((LocalizationService.currentLang() === 'ru') ? ' год ' : ' year ');
      } else {
        years = years + ((LocalizationService.currentLang() === 'ru') ? ' лет ' : ' years ');
      }

      let months: any = Math.floor(diffMonths % 12);
      switch (months) {
        case 0:
          months = '';
          break;
        case 1:
          months = months + ((LocalizationService.currentLang() === 'ru') ? ' месяц' : ' month');
          break;
        case 2:
        case 3:
        case 4:
          months = months + ((LocalizationService.currentLang() === 'ru') ? ' месяца' : ' months');
          break;
        default:
          months = months + ((LocalizationService.currentLang() === 'ru') ? ' месяцев' : ' months');
          break;
      }
      const answer = years + months;
      workPlace.time = answer;
    });
  }

  public setBirthday(dateString): string {
    const day = parseInt(dateString.substring(8, 10));
    const month = parseInt(dateString.substring(5, 7));
    const year = parseInt(dateString.substring(0, 5));

    return `${day}.${month}.${year}`;
  }

  public getAge(dateString): number {
    // 1998-09-23T19:00:00.000Z
    // 22.05.1990
    const day = parseInt(dateString.substring(8, 10));
    const month = parseInt(dateString.substring(5, 7));
    const year = parseInt(dateString.substring(0, 5));

    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // 'month - 1' т.к. нумерация месяцев начинается с 0
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public findNameNationality(): string {
    let i = 0, answer = [];

    if (this.nationalitiesDefault) {
      this.nationalitiesDefault.filter((item) => {
        if (item.code === this.currentResume.nationalities[i]) {
          answer.push(item.name);
          i++;
        }
      });
    }

    return answer.join(', ');
  }

  showContact() {
    if (this.currentUser.paidOptions.countPossibleViewResumeContacts) {
      const confirm = this.confirmService.confirm('Вы хотите посмотреть контактные данные?')
        .subscribe((res) => {
          if (res) {
            this.resumeService.buyResume(this.id)
              .subscribe(() => {
                this.resumeApi.getResumeById(this.id);
                this.userService.getUserInfo();
                this.showContactData = true;
              });
          }
          this._dialog.closeAll();
        });
    } else {
      this.payingModalService.openBuyModal('resume');
    }
  }

  // public captureScreen() {
  //   if (this.isBrowser) {
  //     const data = document.getElementById('contentToConvert');
  //     html2canvas(data).then(canvas => {
  //       // Few necessary setting options
  //       let imgWidth = 208;
  //       let pageHeight = 295;
  //       let imgHeight = canvas.height * imgWidth / canvas.width;
  //       let heightLeft = imgHeight;
  //
  //       const contentDataURL = canvas.toDataURL('image/png')
  //       let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //       let position = 0;
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //       pdf.save(`${this.currentResumeSubject.fullName}.pdf`); // Generated PDF
  //     });
  //   }
  // }

  // "jspdf": "^1.5.3",
  // "html2canvas": "^1.0.0-alpha.12",
}
