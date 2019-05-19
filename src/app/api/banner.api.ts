import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { LocalizationService, SystemMessageService, UserService } from 'services';
import { environment } from '../../environments/environment';

@Injectable()
export class BannerApi {

  url = environment.apiUrl;

  constructor(private http: HttpClient,
              private userService: UserService,
              private messages: SystemMessageService) {
  }

  getBannerById(bannerId: string): Observable<any> {
    return this.http.get(this.url + `/api/v1/banner/get/one?bannerId=${bannerId}`);
  }

  // создание баннера
  createBanner(file, banner): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('fileToUpload', file);
    formData.append('bannerData', JSON.stringify(banner));

    return this.http.post(this.url + '/api/v1/employer/banner/create', formData)
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

    return this.http.post(this.url + '/api/v1/employer/banner/edit', formData)
  }

  publicate(bannerId: string, publicate: boolean, lang: string): Observable<any> {
    return this.http.get(this.url + `/api/v1/admin/banner/publish?bannerId=${bannerId}&publicate=${publicate}&language=${lang}`);
  }

  activate(bannerId: string): Observable<any> {
    return this.http.get(this.url + `/api/v1/employer/banner/time-out/activate?bannerId=${bannerId}`)
      .map(
        res => this.userService.getUserInfo()
      );
  }

  getUserBanners(userId: string): Observable<any> {
    return this.http.post(this.url + '/api/v1/banners/get/all', {
      limit: 100,
      filters: {
        userId,
      },
    }).pipe(
      map(res => {
        let banners = res['banners'];
        banners = banners.sort( (a, b) => (a.status < b.status) ? -1 : ((a.status > b.status) ? 1 : 0) );
        // banners = banners.sort( (a, b) => (a.timeoutDate > b.timeoutDate) ? -1 : ((a.timeoutDate < b.timeoutDate) ? 1 : 0) );
        return banners;
      })
    );
  }

  getListAdminBanner(): Observable<any> {
    return this.http.post(this.url + '/api/v1/banners/get/all', {
      limit: 100,
      filters: {},
    });
  }

  getListBanner(main: boolean): Observable<any> {
    return this.http.post(this.url + '/api/v1/banners/get/all', {
      limit: main ? 3 : 4,
      filters: {
        publicate: true,
        status: 0,
        language: LocalizationService.currentLang()
      },
    });
  }

  checkViewed(bannerId) {
    return this.http.get(this.url + `/api/v1/employer/banner/view?bannerId=${bannerId}`);
  }
}
