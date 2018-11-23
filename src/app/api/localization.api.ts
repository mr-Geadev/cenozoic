import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SystemMessageService } from 'services';

@Injectable()
export class LocalizationApi {

  constructor(private http: HttpClient,
              private messages: SystemMessageService) {
  }

  public getLocalization(lang: string): Observable<any> {
    return this.http.get(`/api/v1/admin/localization/get?language=${lang}`);
  }

  public updateLocalization(lang: string, config: any): Observable<any> {
    return this.http.post(`/api/v1/admin/localization/update`, {
      language: lang,
      config,
    }).map(
      res => { this.messages.info('Сохранено'); return res; }
    );
  }
}
