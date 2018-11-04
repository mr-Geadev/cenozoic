import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocketService, SystemMessageService, UserService } from './services';
import { CitiesService } from './services/cities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public isAdminPanel: boolean = false;

  constructor(private userService: UserService,
              private locations: CitiesService,
              private socket: SocketService,
              private messages: SystemMessageService,
              private router: Router) {

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        event.url.split('/')[1] === 'admin' ? this.isAdminPanel = true : this.isAdminPanel = false;
      }
    });

  }

  ngOnInit(): void {
    this.userService.getUserInfo();
    this.locations.getCities();

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.subscribeSockcet();
        }
      });
  }

  subscribeSockcet() {
    this.socket.on('new-issue-comment').subscribe(
      (data) => {
        console.log('Success in m', data);
        this.messages.info('Вам ответил агент техподдержки');
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      });
  }
}
