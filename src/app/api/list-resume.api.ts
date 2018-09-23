import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ListResumeApi {

    constructor(private http: HttpClient) {
    }

    public getUserResume(): Observable<any> {
        return this.http.get(`/api/v1/user/resume/all`);
    }
}
