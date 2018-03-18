import { Component, OnInit } from "@angular/core";
import { LocalizationService } from "../../services";

@Component({
    selector: 'personal-account-page',
    templateUrl: './personal-account-page.component.html',
    styleUrls: ['./personal-account-page.component.less']
})
export class PersonalAccountPageComponent implements OnInit {

    public activeTab: string = 'Резюме';
    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }
}