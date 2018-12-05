import { Component, Input, OnInit } from '@angular/core';
import { RespondModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'list-respond',
  templateUrl: './list-respond.component.html',
  styleUrls: ['./list-respond.component.scss'],
})
export class ListRespondComponent implements OnInit {

  @Input('typeUser') typeUser: string;
  @Input('listRespond') listRespond: RespondModel[];

  public dictionary: any = {};

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }
}
