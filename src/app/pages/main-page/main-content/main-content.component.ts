import {Component, OnInit} from '@angular/core';

import {LocalizationService} from '../../../services/index';

@Component({
    selector: 'main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
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
