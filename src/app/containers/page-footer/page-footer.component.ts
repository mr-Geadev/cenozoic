import {Component, OnInit} from '@angular/core';

import {LocalizationService} from '../../services';

@Component({
    selector: 'page-footer',
    templateUrl: './page-footer.component.html',
    styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {
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
