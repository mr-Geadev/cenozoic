import { Component, OnInit } from '@angular/core';
import { RespondModel } from 'models';
import { LocalizationService } from '../../services';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'personal-account-page',
  templateUrl: './personal-account-page.component.html',
  styleUrls: ['./personal-account-page.component.scss'],
})
export class PersonalAccountPageComponent implements OnInit {

  public activeTab: string = null;
  public dictionary: any = null;
  public typeCurrentUser: string = null;

  public listOfResponds = [
    new RespondModel(0, 'respond', false),
    new RespondModel(3, 'respond', true),
    new RespondModel(4, 'respond', true),
    new RespondModel(5, 'respond', true),
    new RespondModel(6, 'respond', true),
  ]

  public listOfOffers = [
    new RespondModel(0, 'offer', false),
    new RespondModel(5, 'offer', true),
    new RespondModel(6, 'offer', true),
  ]

  constructor(private _localizationService: LocalizationService,
              private _userService: UserService) {
  }

  public ngOnInit(): void {

    this.dictionary = this._localizationService.currentDictionary;
    this.activeTab = this.dictionary.ACCOUNT_PAGE_TAB_RESPOND;

    this._userService.user$
      .subscribe(
        (user) => user ? this.typeCurrentUser = user.typeAccount : null,
      );
  }

}