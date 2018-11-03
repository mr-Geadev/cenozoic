import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SystemMessageService } from 'services';

@Injectable()
export class NewsApi {

  constructor(private http: HttpClient,
              private messages: SystemMessageService) {
  }

  // получение одной новости по id
  getNewsById(id): Observable<any> {
    return this.http.get(`/api/v1/news/get/one?newsId=${id}`);
  }

  // создание новости
  createNews(file, news): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('fileToUpload', file);
    formData.append('newsData', JSON.stringify(news));

    return this.http.post('/api/v1/employer/news/create', formData)
      .map(
        res => this.messages.info('Новость создана'),
        err => this.messages.info('Создание неудачно'),
      );
  }

  // создание комментария

  // редактирование новости

  // список новостей
  getListNews(newsPage?, mainPage?, user?): Observable<any> {
    let filters = {};

    if (newsPage) {
      filters = {
        publicateToNewsPage: true,
      };
    }

    if (mainPage) {
      filters = {
        publicateToMainPage: true,
      };
    }

    if (user) {
      filters = {
        userId: user,
      };
    }

    return this.http.post('/api/v1/news/get/all', { offset: 0, limit: 100, filters });
  }

  // измение статуса новости
  publishTo(id: string, status: string): Observable<any> {
    let publicTo = {};

    if (status === 'toNews') {
      publicTo = {
        publicateToNewsPage: true,
        publicateToMainPage: false,
      };
    }

    if (status === 'toMain') {
      publicTo = {
        publicateToNewsPage: true,
        publicateToMainPage: true,
      };
    }

    if (status === 'fromNews') {
      publicTo = {
        publicateToNewsPage: false,
        publicateToMainPage: false,
      };
    }

    if (status === 'fromMainPage') {
      publicTo = {
        publicateToNewsPage: true,
        publicateToMainPage: false,
      };
    }

    const body = {
      newsId: id,
      ...publicTo,
    };

    return this.http.post('/api/v1/admin/news/publish', { publishInfo: body });
  }
}
