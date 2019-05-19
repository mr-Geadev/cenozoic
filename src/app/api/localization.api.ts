import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { SystemMessageService } from 'services';
import { environment } from '../../environments/environment';

@Injectable()
export class LocalizationApi {

  url = environment.apiUrl;

  constructor(private http: HttpClient,
              private messages: SystemMessageService) {
  }

  public getLocalization(lang: string): Observable<any> {
    return this.http.get(this.url + `/api/v1/admin/localization/get?language=${lang}`);
  }

  public updateLocalization(lang: string, config: any): Observable<any> {
    return this.http.post(this.url + `/api/v1/admin/localization/update`, {
      language: lang,
      config,
    }).map(
      res => {
        this.messages.info('Сохранено');
        return res;
      },
    );
  }

  public updateStaticPage(lang: string, page: string, html: string) {
    const body = {
      language: lang,
      page: page,
      pageHTML: html,
    };

    return this.http.post(this.url + '/api/v1/admin/custom-pages/update', body).pipe(
      tap(() => this.messages.info('Сохранено')),
    );
  }

  public getStaticPage(lang: string, page: string) {
    const url = this.url + `/api/v1/admin/custom-pages/get?language=${lang}&page=${page}`;

    return this.http.get(url);
  }

}
