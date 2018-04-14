import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.less']
})
export class ResumeListComponent implements OnInit {

  public listResume: any = null;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
      this._http.post(`http://134.0.119.98:8080/api/v1/resume/get/all`, { offset: 0, count: 24 })
          .subscribe((res: any) => {
              this.listResume = res.resumeList;
          })
  }




}
