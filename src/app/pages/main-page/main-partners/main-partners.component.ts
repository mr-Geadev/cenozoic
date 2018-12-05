import { Component, OnInit } from '@angular/core';

import { LocalizationService } from "../../../services/index";

@Component({
    selector: 'main-partners',
    templateUrl: './main-partners.component.html',
    styleUrls: ['./main-partners.component.scss']
})
export class MainPartnersComponent implements OnInit {
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
