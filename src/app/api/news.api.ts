import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SystemMessageService } from 'services';
import 'rxjs-compat/add/operator/share';

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
        err => this.messages.info('Что-то пошло не так'),
      );
  }

  // создание комментария
  addComent(newsId, comment): Observable<any> {
    return this.http.post('/api/v1/news/comment/create', { commentInfo: { newsId, comment } })
      .map(
        res => {},
        err => this.messages.info('Что-то пошло не так'),
      );
  }

  // редактирование новости
  editNews(id, news, image?): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('newsId', id);
    formData.append('newsData', JSON.stringify(news));
    if (image) {
      formData.append('fileToUpload', image);
    }

    return this.http.post('/api/v1/employer/news/edit', formData)
      .map(
        res => this.messages.info('Успешно измненена'),
        err => this.messages.info('Что-то пошло не так'),
      );
  }

  // список новостей
  getListNews(newsPage?, mainPage?, user?, searchString?): Observable<any> {
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

    if (searchString) {
      filters = Object.assign(filters, { search: searchString});
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

  removeNews(id: string): Observable<any> {
    return this.http.get(`/api/v1/employer/news/remove?newsId=${id}`)
      .map(res => {
        this.messages.info('Новость удалена');
      });
  }

  removeComment(newsId: string, indexComment: number): Observable<any> {
    return this.http.get(`/api/v1/admin/news/comment/remove?newsId=${newsId}&commentId=${indexComment}`)
      .map(res => {
        this.messages.info('Комментарий удален');
      });
  }
}
