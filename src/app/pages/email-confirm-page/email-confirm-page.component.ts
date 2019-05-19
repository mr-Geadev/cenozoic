import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalizationService} from '../../services';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'account-email-confirm',
    templateUrl: './email-confirm-page.component.html',
    styleUrls: ['./email-confirm-page.component.scss']
})
export class EmailConfirmPageComponent implements OnInit {

    public token: string = null;
    public status: string = 'loading';
    public dictionary: any = {};

    constructor(private activateRoute: ActivatedRoute,
                private _localizationService: LocalizationService,
                private _http: HttpClient) {
        this.token = activateRoute.snapshot.params['token'];
    }


    public ngOnInit() {

      this._localizationService.currentDictionary
        .subscribe(
          res => this.dictionary = res
        );

        this._http.get(environment.apiUrl + `/api/v1/user/email/confirm?confirmToken=${this.token}`)
            .subscribe(
                (res) => {
                    this.status = 'success';
                },
                (err) => {
                    this.status = 'error';
                }
            );
    }


}
