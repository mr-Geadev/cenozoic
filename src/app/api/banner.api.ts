import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalizationService, SystemMessageService, UserService } from 'services';

@Injectable()
export class BannerApi {

  constructor(private http: HttpClient,
              private userService: UserService,
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
        res => {
          this.userService.getUserInfo();
        }
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

    return this.http.post('/api/v1/employer/banner/edit', formData)
  }

  publicate(bannerId: string, publicate: boolean, lang: string): Observable<any> {
    return this.http.get(`/api/v1/admin/banner/publish?bannerId=${bannerId}&publicate=${publicate}&language=${lang}`);
  }

  activate(bannerId: string): Observable<any> {
    return this.http.get(`/api/v1/employer/banner/time-out/activate?bannerId=${bannerId}`)
      .map(
        res => this.userService.getUserInfo()
      );
  }

  getUserBanners(userId: string): Observable<any> {
    return this.http.post('/api/v1/banners/get/all', {
      limit: 100,
      filters: {
        userId,
      },
    });
  }

  getListAdminBanner(): Observable<any> {
    return this.http.post('/api/v1/banners/get/all', {
      limit: 100,
      filters: {},
    });
  }

  getListBanner(main: boolean): Observable<any> {
    return this.http.post('/api/v1/banners/get/all', {
      limit: main ? 3 : 4,
      filters: {
        publicate: true,
        language: LocalizationService.currentLang()
      },
    });
  }
}
