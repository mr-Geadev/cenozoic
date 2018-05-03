import { Component, OnInit } from '@angular/core';

import { LocalizationService } from "../../services";

@Component({
    selector: 'main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.less']
})
export class MainContentComponent implements OnInit {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
