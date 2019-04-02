import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizationService, SocketService, SystemMessageService, UserService } from './services';
import { CitiesService } from './services/cities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public isAdminPanel: boolean = false;
  public dictionary: any = {};
  public currentLang: string;
  isBetaModalHide: string = '0';

  constructor(private userService: UserService,
              private locations: CitiesService,
              private socket: SocketService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private messages: SystemMessageService,
              private _localizationService: LocalizationService,
              private router: Router) {

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        event.url.split('/')[1] === 'admin' ? this.isAdminPanel = true : this.isAdminPanel = false;
      }
    });

  }

  ngOnInit(): void {
    this.userService.getUserInfo();
    this.locations.getCities(LocalizationService.currentLang());

    this.currentLang = LocalizationService.currentLang();

    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.subscribeSockcet();
        }
      });

    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('isBetaModalHide')) {
          this.isBetaModalHide = '1';
        }
      }
    }
  }

  subscribeSockcet() {
    this.socket.on('new-issue-comment').subscribe(
      (data) => {
        console.log('Success in m', data);
        this.messages.info(this.dictionary.INFO_MESSAGES_SUPPORT_IS_ANSWERED);
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      });
  }

  hideBetaModal() {
    this.isBetaModalHide = '1';

    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isBetaModalHide', '1');
      }
    }
  }
}
