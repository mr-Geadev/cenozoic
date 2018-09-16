import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'card-offer',
  templateUrl: 'card-offer.component.html',
  styleUrls: ['card-offer.component.scss'],
})
export class CardOfferComponent implements OnInit {

  @Input('offer') respond?: any;
  @Input('status') status?: string; // pending/responded/refused
  @Input('new') new?: boolean;
  @Input('typeUser') typeUser: string; // worker/employer

  public dictionary: any = null;

  constructor(private _localization: LocalizationService) {
  }

  ngOnInit() {
    this.dictionary = this._localization.currentDictionary;
  }

}
