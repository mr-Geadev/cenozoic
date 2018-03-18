import { Component, OnInit } from '@angular/core';

import { LocalizationService } from "../../services";

@Component({
    selector: 'main-partners',
    templateUrl: './main-partners.component.html',
    styleUrls: ['./main-partners.component.less']
})
export class MainPartnersComponent implements OnInit {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
