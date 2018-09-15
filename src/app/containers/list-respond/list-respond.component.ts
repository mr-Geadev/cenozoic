import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'list-respond',
  templateUrl: './list-respond.component.html',
  styleUrls: ['./list-respond.component.scss'],
})
export class ListRespondComponent implements OnInit {

  public dictionary: any = null;

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;
  }
}
