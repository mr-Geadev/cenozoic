import { Component, OnInit } from "@angular/core";

import { LocalizationService } from "../../services";

@Component({
    selector: 'last-added',
    templateUrl: './last-added.component.html',
    styleUrls: ['./last-added.component.less']
})
export class LastAddedComponent implements OnInit {
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
