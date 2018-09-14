import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'card-respond',
  templateUrl: 'card-respond.component.html',
  styleUrls: ['card-respond.component.scss'],
})
export class CardRespondComponent implements OnInit {

  @Input('respond') respond: any;

  public dictionary: any = null;

  constructor(private _localization: LocalizationService) {
  }

  ngOnInit() {
    this.dictionary = this._localization.currentDictionary;
  }

}
