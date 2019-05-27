import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'services';

@Component({
  selector: 'admin-main.col',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public statistics: any = null;
  user;

  constructor(private _http: HttpClient,
  private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$
      .subscribe(user => this.user = user);

    this._http.get('/api/v1/admin/statistics')
      .subscribe((res) => {
        this.statistics = res['statistics'];
      });
  }

}
