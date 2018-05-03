import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminResumeApi {

    constructor(private _http: HttpClient) {
    }

    public deleteResume(resumeId: string, idOwnerResume: string): Observable<any> {
        return this._http.get('/api/v1/user/resume/remove?' + `resumeId=${resumeId}` + '&' + `uid=${idOwnerResume}`)
            .map(
                res => true,
                err => err
            );

    }

}