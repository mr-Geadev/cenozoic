import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalizationService } from "../../services";

@Component({
    selector: 'account-email-confirm',
    templateUrl: './account-email-confirm.component.html',
    styleUrls: ['./account-email-confirm.component.less']
})
export class AccountEmailConfirmComponent implements OnInit {

    public token: string = null;
    public status: string = 'loading';
    public dictionary: any = null;

    constructor(private activateRoute: ActivatedRoute,
                private _localizationService: LocalizationService,
                private _http: HttpClient) {
        this.token = activateRoute.snapshot.params['token'];
    }


    public ngOnInit() {

        this.dictionary = this._localizationService.currentDictionary;

        this._http.get(`/api/v1/user/email/confirm?confirmToken=${this.token}`)
            .subscribe(
                (res) => {this.status = 'success'},
                (err) => {this.status = 'error'}
            )
    }


}