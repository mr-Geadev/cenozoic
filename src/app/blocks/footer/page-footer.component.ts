import { Component, OnInit } from '@angular/core';

import { LocalizationService } from "../../services";

@Component({
    selector: 'page-footer',
    templateUrl: './page-footer.component.html',
    styleUrls: ['./page-footer.component.less']
})
export class PageFooterComponent implements OnInit {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
