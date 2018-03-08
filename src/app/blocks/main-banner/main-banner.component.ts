import { Component, OnInit } from '@angular/core';

import { LocalizationService } from "../../services";

@Component({
    selector: 'main-banner',
    templateUrl: './main-banner.component.html',
    styleUrls: ['./main-banner.component.less']
})
export class MainBannerComponent implements OnInit {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
