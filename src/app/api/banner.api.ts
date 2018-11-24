import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SystemMessageService } from 'services';

@Injectable()
export class BannerApi {

  constructor(private http: HttpClient,
              private messages: SystemMessageService) {
  }

  getBannerById(bannerId: string): Observable<any> {
    return this.http.get(`/api/v1/banner/get/one?bannerId=${bannerId}`);
  }

  // создание баннера
  createBanner(file, banner): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('fileToUpload', file);
    formData.append('bannerData', JSON.stringify(banner));

    return this.http.post('/api/v1/employer/banner/create', formData)
      .map(
        res => this.messages.info('Баннер создан'),
        err => this.messages.info('Что-то пошло не так'),
      );
  }

  // редактирование баннера
  editBanner(id, banner, image?): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('bannerId', id);
    formData.append('bannerData', JSON.stringify(banner));
    if (image) {
      formData.append('fileToUpload', image);
    }

    return this.http.post('/api/v1/employer/news/edit', formData)
      .map(
        res => this.messages.info('Успешно измненена'),
        err => this.messages.info('Что-то пошло не так'),
      );
  }

  getUserBanners(userId: string): Observable<any> {
    return this.http.post('/api/v1/banners/get/all', {
      limit: 100,
      filter: {
        userId
      }
    });
  }
}
