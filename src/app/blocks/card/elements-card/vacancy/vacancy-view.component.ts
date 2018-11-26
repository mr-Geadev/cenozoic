import { Component, Input, OnInit } from '@angular/core';
import { UserModel, VacancyModel } from 'models';
import { UserService } from 'services';

@Component({
  selector: 'vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss'],
})
export class VacancyViewComponent implements OnInit {

  @Input('dictionary') dictionary: any;
  @Input('vacancy') vacancy: VacancyModel;
  @Input('respondTitle') respondTitle?: string;

  public user: UserModel = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$
      .filter(user => !!user)
      .subscribe(
        user => {
          this.user = new UserModel(user);
          this.vacancy = new VacancyModel(this.vacancy);
        }
      )
    ;
  }

}
