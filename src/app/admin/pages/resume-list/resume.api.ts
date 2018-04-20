import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ResumeApi {

    constructor(private _http: HttpClient) {
    }

    public deleteResume(resumeId: string, idOwnerResume: string): void {


        this._http.get('/api/v1/user/resume/remove?' + `resumeId${resumeId}` + '&' + `uid${idOwnerResume}`)
            .subscribe(

            )
    }

}