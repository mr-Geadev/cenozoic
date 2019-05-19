import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'admin-main.col',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public statistics: any = null;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get(environment.apiUrl + '/api/v1/admin/statistics')
      .subscribe((res) => {
        this.statistics = res['statistics'];
      });
  }

}
